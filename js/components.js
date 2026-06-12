// Toast utility
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || ''}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}
window.showToast = showToast;

window.Components = {
    // Match Card
    MatchCard: (match) => {
        const isTeam1Winner = match.team1.score > match.team2.score;
        const statusBadge = match.status === 'Completed' ? '<span class="badge badge-completed">Terminé</span>' :
            match.status === 'Live' ? '<span class="badge badge-live">● LIVE</span>' :
            '<span class="badge badge-upcoming">À venir</span>';
        return `
        <div class="match-item fade-in" data-id="${match.id}">
            <div class="team left">
                <div class="team-logo">${match.team1.logo}</div>
                <span class="team-name">${match.team1.name}</span>
            </div>
            <div class="score-board">
                <span class="match-event">${match.event}</span>
                <div style="display:flex;gap:0.75rem;align-items:center;">
                    <span class="score ${isTeam1Winner ? 'blue-win' : ''}">${match.team1.score}</span>
                    <span style="color:var(--text-muted);font-weight:bold;">—</span>
                    <span class="score ${!isTeam1Winner && match.status !== 'Upcoming' ? 'orange-win' : ''}">${match.team2.score}</span>
                </div>
                <div style="display:flex;gap:0.5rem;align-items:center;">
                    ${statusBadge}
                    <span style="font-size:0.75rem;color:var(--text-muted)">${match.date} • ${match.duration}</span>
                </div>
            </div>
            <div class="team right">
                <div class="team-logo">${match.team2.logo}</div>
                <span class="team-name">${match.team2.name}</span>
            </div>
        </div>`;
    },

    // Player Card
    PlayerCard: (player) => {
        const isFav = window.Auth ? window.Auth.isFavorite('players', player.id) : false;
        return `
        <div class="player-card fade-in" data-id="${player.id}">
            <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="window.app.toggleFavorite(event,'players','${player.id}')">
                <i data-lucide="heart" ${isFav ? 'style="fill:var(--danger)"' : ''}></i>
            </button>
            <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
            <h3 class="player-name">${player.country || ''} ${player.name}</h3>
            <span class="player-team">${player.team} • ${player.region || ''}</span>
            <div style="display:flex;gap:0.4rem;margin-bottom:0.8rem;">
                <span class="badge" style="background:rgba(0,229,255,0.1);color:var(--accent-blue);">${player.role || 'Flex'}</span>
                <span class="badge" style="background:rgba(255,107,0,0.1);color:var(--accent-orange);">⭐ ${player.stats.rating || '—'}</span>
            </div>
            <div class="player-stats-mini">
                <div class="stat-item"><span class="stat-value" style="color:var(--accent-blue)">${player.stats.goalsPerGame}</span><span class="stat-label">Buts/G</span></div>
                <div class="stat-item"><span class="stat-value">${player.stats.assistsPerGame}</span><span class="stat-label">Passes/G</span></div>
                <div class="stat-item"><span class="stat-value">${player.stats.savesPerGame}</span><span class="stat-label">Arrêts/G</span></div>
                <div class="stat-item"><span class="stat-value" style="color:var(--accent-orange)">${player.stats.shotPct || player.stats.shotPercentage || '—'}%</span><span class="stat-label">Précision</span></div>
            </div>
        </div>`;
    },

    // Home View
    HomeView: async () => {
        const [PLAYERS, MATCHES, UPCOMING] = await Promise.all([
            window.Api.getPlayers(), window.Api.getMatches(), window.Api.getUpcomingMatches()
        ]);
        const recentMatches = MATCHES.slice(0, 3).map(m => window.Components.MatchCard(m)).join('');
        const topPlayers = PLAYERS.sort((a, b) => b.stats.scorePerGame - a.stats.scorePerGame).slice(0, 4).map(p => window.Components.PlayerCard(p)).join('');
        
        // Upcoming match preview
        const nextMatch = UPCOMING[0];
        const nextMatchHtml = nextMatch ? `
            <div style="display:flex;align-items:center;justify-content:center;gap:2rem;padding:1.5rem 0;">
                <div style="text-align:center"><div class="team-logo" style="width:56px;height:56px;margin:0 auto 0.5rem;">${nextMatch.team1.logo}</div><span style="font-weight:600">${nextMatch.team1.name}</span></div>
                <div style="text-align:center"><span class="badge badge-upcoming" style="font-size:0.8rem;">VS</span><br><span style="color:var(--text-muted);font-size:0.8rem;">${nextMatch.date}</span></div>
                <div style="text-align:center"><div class="team-logo" style="width:56px;height:56px;margin:0 auto 0.5rem;">${nextMatch.team2.logo}</div><span style="font-weight:600">${nextMatch.team2.name}</span></div>
            </div>
            <div style="text-align:center"><button class="btn-auth" onclick="window.navigate('predictions')">Faire un pronostic</button></div>
        ` : '';

        // Stats overview
        const totalGoals = PLAYERS.reduce((s, p) => s + Math.round(p.stats.goalsPerGame * p.stats.gamesPlayed), 0);
        const totalSaves = PLAYERS.reduce((s, p) => s + Math.round(p.stats.savesPerGame * p.stats.gamesPlayed), 0);
        const totalDemos = PLAYERS.reduce((s, p) => s + Math.round(p.stats.dpm * p.stats.gamesPlayed * 5), 0);

        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Dashboard</h1><p class="section-subtitle">Aperçu général de la scène esport Rocket League</p></div></div>
        <div class="dashboard-grid">
            <div class="card col-span-8 fade-in" style="animation-delay:0.05s">
                <h2 style="margin-bottom:1.25rem;font-family:var(--font-heading);color:var(--accent-blue)"><i data-lucide="trophy" style="width:20px;height:20px;display:inline;vertical-align:middle;margin-right:0.5rem;"></i>Matchs Récents</h2>
                ${recentMatches}
                <button class="btn-back" style="margin-top:1rem;" onclick="window.navigate('history')">Voir tout l'historique <i data-lucide="arrow-right"></i></button>
            </div>
            <div class="col-span-4" style="display:flex;flex-direction:column;gap:1.5rem;">
                <div class="card fade-in" style="animation-delay:0.1s">
                    <h2 style="margin-bottom:1rem;font-family:var(--font-heading);color:var(--accent-orange)"><i data-lucide="bar-chart-3" style="width:18px;height:18px;display:inline;vertical-align:middle;margin-right:0.5rem;"></i>Stats Globales</h2>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:rgba(0,0,0,0.25);border-radius:var(--radius-sm);">
                            <span style="color:var(--text-muted);font-size:0.9rem;">🔥 Démolitions</span>
                            <span style="font-weight:700;color:var(--danger)">${totalDemos.toLocaleString()}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:rgba(0,0,0,0.25);border-radius:var(--radius-sm);">
                            <span style="color:var(--text-muted);font-size:0.9rem;">⚽ Buts Marqués</span>
                            <span style="font-weight:700;color:var(--accent-blue)">${totalGoals.toLocaleString()}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:rgba(0,0,0,0.25);border-radius:var(--radius-sm);">
                            <span style="color:var(--text-muted);font-size:0.9rem;">🛡️ Arrêts</span>
                            <span style="font-weight:700;color:var(--accent-orange)">${totalSaves.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div class="card fade-in" style="animation-delay:0.15s">
                    <h2 style="margin-bottom:0.5rem;font-family:var(--font-heading);font-size:1rem;"><i data-lucide="calendar" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:0.5rem;color:var(--accent-purple);"></i>Prochain Match</h2>
                    ${nextMatchHtml}
                </div>
            </div>
            <div class="card col-span-12 fade-in" style="animation-delay:0.2s">
                <h2 style="margin-bottom:1.25rem;font-family:var(--font-heading)"><i data-lucide="trending-up" style="width:20px;height:20px;display:inline;vertical-align:middle;margin-right:0.5rem;color:var(--accent-blue);"></i>Joueurs en Tendance</h2>
                <div class="player-list">${topPlayers}</div>
            </div>
        </div>`;
    },

    // History View
    HistoryView: async () => {
        const MATCHES = await window.Api.getMatches();
        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Historique RLCS</h1><p class="section-subtitle">Tous les matchs professionnels récents</p></div></div>
        <div class="card fade-in">${MATCHES.map(m => window.Components.MatchCard(m)).join('')}</div>`;
    },

    // Players View
    PlayersView: async () => {
        const PLAYERS = await window.Api.getPlayers();
        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Joueurs Pro</h1><p class="section-subtitle">Statistiques détaillées des meilleurs joueurs</p></div></div>
        <div class="player-list fade-in">${PLAYERS.map(p => window.Components.PlayerCard(p)).join('')}</div>`;
    },
    
    // Player Detail View
    PlayerDetailView: async (playerId) => {
        const PLAYERS = await window.Api.getPlayers();
        const player = PLAYERS.find(p => p.id === playerId);
        if (!player) return `<h2>Joueur introuvable</h2>`;
        const isFav = window.Auth ? window.Auth.isFavorite('players', player.id) : false;
        const shotPct = player.stats.shotPct || player.stats.shotPercentage || 0;
        return `
        <button class="btn-back fade-in" onclick="window.navigate('players')"><i data-lucide="arrow-left"></i> Retour aux joueurs</button>
        <div class="detail-header fade-in" style="position:relative;">
            <button class="favorite-btn ${isFav ? 'active' : ''}" style="top:1.5rem;right:1.5rem;width:44px;height:44px;" onclick="window.app.toggleFavorite(event,'players','${player.id}')">
                <i data-lucide="heart" ${isFav ? 'style="fill:var(--danger)"' : ''}></i>
            </button>
            <img src="${player.avatar}" alt="${player.name}" class="detail-avatar">
            <div class="detail-info">
                <h1>${player.country || ''} ${player.name}</h1>
                <p>${player.team} — ${player.region}</p>
                <span style="color:var(--text-muted);font-size:0.9rem;">${player.realName || ''}</span>
                <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
                    <span class="badge badge-completed">${player.role}</span>
                    <span class="badge" style="background:rgba(0,229,255,0.1);color:var(--accent-blue);">${player.stats.gamesPlayed} matchs joués</span>
                    <span class="badge" style="background:rgba(255,107,0,0.1);color:var(--accent-orange);">⭐ Rating: ${player.stats.rating || '—'}</span>
                </div>
            </div>
        </div>
        <h2 style="margin-bottom:1.25rem;font-family:var(--font-heading)" class="fade-in">Statistiques par Match</h2>
        <div class="stat-grid fade-in" style="animation-delay:0.1s">
            <div class="stat-box"><i data-lucide="star"></i><span class="stat-value" style="font-size:2.2rem;color:var(--accent-orange)">${player.stats.rating || '—'}</span><span class="stat-label">Rating</span></div>
            <div class="stat-box"><i data-lucide="target"></i><span class="stat-value" style="font-size:2.2rem;color:var(--accent-blue)">${player.stats.goalsPerGame}</span><span class="stat-label">Buts/Match</span></div>
            <div class="stat-box"><i data-lucide="share-2"></i><span class="stat-value" style="font-size:2.2rem">${player.stats.assistsPerGame}</span><span class="stat-label">Passes Déc.</span></div>
            <div class="stat-box"><i data-lucide="shield"></i><span class="stat-value" style="font-size:2.2rem">${player.stats.savesPerGame}</span><span class="stat-label">Arrêts</span></div>
            <div class="stat-box"><i data-lucide="crosshair"></i><span class="stat-value" style="font-size:2.2rem">${player.stats.shotsPerGame || '—'}</span><span class="stat-label">Tirs/Match</span></div>
            <div class="stat-box"><i data-lucide="percent"></i><span class="stat-value" style="font-size:2.2rem">${shotPct}%</span><span class="stat-label">Précision Tirs</span></div>
            <div class="stat-box"><i data-lucide="activity"></i><span class="stat-value" style="font-size:2.2rem">${player.stats.scorePerGame}</span><span class="stat-label">Score/Match</span></div>
            <div class="stat-box"><i data-lucide="flame"></i><span class="stat-value dpm-highlight" style="font-size:2.2rem">${player.stats.dpm}</span><span class="stat-label">Démos/Min</span></div>
        </div>
        <div class="card fade-in" style="animation-delay:0.15s;margin-top:2rem;display:flex;flex-direction:column;align-items:center;">
            <h2 style="margin-bottom:1.25rem;font-family:var(--font-heading)">Radar de Performance</h2>
            <div style="width:100%;max-width:480px;"><canvas id="playerRadarChart"></canvas></div>
        </div>`;
    },

    // Teams View
    TeamsView: async () => {
        const TEAMS = await window.Api.getTeams();
        const teamsList = TEAMS.sort((a, b) => a.rank - b.rank).map((t, i) => {
            const isFav = window.Auth ? window.Auth.isFavorite('teams', t.id) : false;
            const rankColors = ['var(--accent-orange)', 'var(--accent-blue)', 'var(--accent-purple)'];
            const rankColor = i < 3 ? rankColors[i] : 'var(--text-muted)';
            return `
            <div class="match-item fade-in" style="justify-content:flex-start;gap:1.5rem;position:relative;animation-delay:${i * 0.04}s">
                <button class="favorite-btn ${isFav ? 'active' : ''}" style="top:50%;right:0.75rem;transform:translateY(-50%);" onclick="window.app.toggleFavorite(event,'teams','${t.id}')">
                    <i data-lucide="heart" ${isFav ? 'style="fill:var(--danger)"' : ''}></i>
                </button>
                <div style="font-size:1.4rem;font-family:var(--font-heading);font-weight:900;width:36px;color:${rankColor};text-align:center;">${t.rank}</div>
                <div class="team-logo">${t.logo}</div>
                <div style="flex:1;display:flex;flex-direction:column;">
                    <span style="font-size:1.1rem;font-weight:700;">${t.name}</span>
                    <span style="font-size:0.8rem;color:var(--text-muted);">${t.region} • ${t.players.join(', ')}</span>
                </div>
                <div style="display:flex;gap:0.75rem;margin-right:3rem;">
                    <span class="badge" style="background:rgba(0,229,255,0.1);color:var(--accent-blue);padding:0.3rem 0.8rem;">${t.points} pts</span>
                    <span class="badge" style="background:rgba(0,0,0,0.3);color:var(--text-main);padding:0.3rem 0.8rem;">${t.winRate}% WR</span>
                </div>
            </div>`;
        }).join('');
        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Équipes & Power Rankings</h1><p class="section-subtitle">Classement basé sur les points RLCS</p></div></div>
        <div class="card fade-in">${teamsList}</div>`;
    },

    // Match Detail View
    MatchDetailView: async (matchId) => {
        const MATCHES = await window.Api.getMatches();
        const match = MATCHES.find(m => m.id === matchId);
        if (!match) return `<h2>Match introuvable</h2>`;
        const isTeam1Winner = match.team1.score > match.team2.score;

        let gamesHtml = '';
        if (match.games && match.games.length > 0) {
            gamesHtml = match.games.map((g, i) => `
                <div class="match-item fade-in" style="margin-bottom:0.5rem;animation-delay:${i * 0.05}s">
                    <div style="width:12%;color:var(--text-muted);font-family:var(--font-heading);font-weight:700;">Game ${g.id.replace('g','')}</div>
                    <div style="flex:1;text-align:right;font-weight:${g.winner === match.team1.logo ? '700' : '400'};color:${g.winner === match.team1.logo ? 'var(--accent-blue)' : 'var(--text-muted)'}">${match.team1.name}</div>
                    <div style="padding:0 1.5rem;font-family:var(--font-heading);font-weight:900;font-size:1.1rem;">${g.score1} — ${g.score2}</div>
                    <div style="flex:1;text-align:left;font-weight:${g.winner === match.team2.logo ? '700' : '400'};color:${g.winner === match.team2.logo ? 'var(--accent-orange)' : 'var(--text-muted)'}">${match.team2.name}</div>
                    <div style="width:22%;text-align:right;color:var(--text-muted);font-size:0.8rem;">📍 ${g.map}</div>
                </div>`).join('');
        } else {
            gamesHtml = `<p style="color:var(--text-muted);text-align:center;padding:2rem;">Détails des manches non disponibles.</p>`;
        }

        const vodUrl = match.vodUrl || 'https://www.youtube.com/embed/Y8hx6pkIfvU';
        const existingPrediction = window.Auth ? window.Auth.getPrediction(match.id) : null;
        let predictionHtml = existingPrediction ? `
            <div class="prediction-card" style="background:rgba(0,229,255,0.04);border-color:var(--accent-blue);">
                <h3 style="color:var(--accent-blue);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;"><i data-lucide="check-circle" style="width:18px;height:18px;"></i> Votre Prédiction</h3>
                <p>Victoire de <strong>${existingPrediction.winner}</strong> — Score: <strong>${existingPrediction.score1} - ${existingPrediction.score2}</strong></p>
            </div>` : `
            <div class="prediction-card">
                <h3 style="margin-bottom:1rem;font-size:1rem;">🎯 Pronostic</h3>
                <div style="display:flex;gap:1rem;align-items:center;justify-content:center;">
                    <div style="text-align:center"><div class="team-logo" style="margin:0 auto 0.4rem;">${match.team1.logo}</div><input type="number" id="pred-score1" min="0" max="7" value="0" class="modal-input" style="width:55px;text-align:center;margin:0;padding:0.5rem;"></div>
                    <span style="font-weight:900;font-size:1.5rem;color:var(--text-muted);">—</span>
                    <div style="text-align:center"><div class="team-logo" style="margin:0 auto 0.4rem;">${match.team2.logo}</div><input type="number" id="pred-score2" min="0" max="7" value="0" class="modal-input" style="width:55px;text-align:center;margin:0;padding:0.5rem;"></div>
                </div>
                <div style="text-align:center;margin-top:1rem;"><button class="btn-auth" onclick="window.app.savePrediction('${match.id}','${match.team1.logo}','${match.team2.logo}')">Valider</button></div>
            </div>`;

        return `
        <button class="btn-back fade-in" onclick="window.navigate('history')"><i data-lucide="arrow-left"></i> Retour</button>
        <div class="detail-header fade-in" style="justify-content:space-around;text-align:center;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
                <div class="team-logo" style="width:80px;height:80px;font-size:1.6rem;">${match.team1.logo}</div>
                <h2 style="color:${isTeam1Winner ? 'var(--accent-blue)' : 'inherit'};font-size:1.3rem;">${match.team1.name}</h2>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;">
                <span class="match-event" style="margin-bottom:0.75rem;">${match.event}</span>
                <div style="font-size:4rem;font-family:var(--font-heading);font-weight:900;letter-spacing:4px;">
                    <span class="${isTeam1Winner ? 'blue-win' : ''}">${match.team1.score}</span>
                    <span style="color:var(--text-muted);margin:0 0.5rem;">—</span>
                    <span class="${!isTeam1Winner ? 'orange-win' : ''}">${match.team2.score}</span>
                </div>
                <span class="badge badge-completed" style="margin-top:0.5rem;">${match.duration} • ${match.status}</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
                <div class="team-logo" style="width:80px;height:80px;font-size:1.6rem;">${match.team2.logo}</div>
                <h2 style="color:${!isTeam1Winner ? 'var(--accent-orange)' : 'inherit'};font-size:1.3rem;">${match.team2.name}</h2>
            </div>
        </div>
        <div class="dashboard-grid">
            <div class="card col-span-8 fade-in" style="animation-delay:0.1s;">
                <h2 style="font-family:var(--font-heading);margin-bottom:1rem;">Détail des Manches</h2>
                ${gamesHtml}
                <div style="margin-top:2rem;text-align:center;">
                    <a href="https://ballchasing.com/?title=RLCS" target="_blank" class="btn-outline-orange"><i data-lucide="download" style="width:16px;height:16px;"></i> Télécharger .replay</a>
                </div>
                <div style="margin-top:2rem;">
                    <h3 style="font-family:var(--font-heading);margin-bottom:0.75rem;text-align:center;">Rediffusion</h3>
                    <iframe width="100%" height="400" src="${vodUrl}" title="RLCS VOD" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="border-radius:var(--radius-md);border:1px solid var(--border-color);"></iframe>
                </div>
            </div>
            <div class="col-span-4 fade-in" style="animation-delay:0.15s;">${predictionHtml}</div>
        </div>`;
    },

    // Predictions View
    PredictionsView: async () => {
        const UPCOMING = await window.Api.getUpcomingMatches();
        const isLoggedIn = window.Auth && window.Auth.isLoggedIn();
        
        const upcomingCards = UPCOMING.map(m => {
            const existingPred = window.Auth ? window.Auth.getPrediction(m.id) : null;
            const predSection = existingPred ? `
                <div style="text-align:center;padding:0.75rem;background:rgba(0,229,255,0.05);border-radius:var(--radius-sm);margin-top:1rem;">
                    <span style="color:var(--accent-blue);font-weight:600;">✅ ${existingPred.winner} — ${existingPred.score1}-${existingPred.score2}</span>
                </div>` : `
                <div style="display:flex;gap:0.75rem;align-items:center;justify-content:center;margin-top:1rem;">
                    <input type="number" id="pred-${m.id}-1" min="0" max="7" value="0" class="modal-input" style="width:50px;text-align:center;margin:0;padding:0.4rem;">
                    <span style="font-weight:900;color:var(--text-muted);">—</span>
                    <input type="number" id="pred-${m.id}-2" min="0" max="7" value="0" class="modal-input" style="width:50px;text-align:center;margin:0;padding:0.4rem;">
                </div>
                <div style="text-align:center;margin-top:0.75rem;">
                    <button class="btn-auth" style="font-size:0.85rem;padding:0.4rem 1rem;" onclick="window.app.savePredictionFromList('${m.id}','${m.team1.logo}','${m.team2.logo}')">Valider</button>
                </div>`;

            return `
            <div class="prediction-card fade-in" style="margin-bottom:1.25rem;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
                    <span class="match-event">${m.event}</span>
                    <span class="badge badge-upcoming">${m.date}</span>
                </div>
                <div style="display:flex;align-items:center;justify-content:center;gap:2rem;padding:1rem 0;">
                    <div style="text-align:center"><div class="team-logo" style="width:52px;height:52px;margin:0 auto 0.4rem;">${m.team1.logo}</div><span style="font-weight:600;font-size:0.95rem;">${m.team1.name}</span></div>
                    <span style="font-weight:900;font-size:1.5rem;color:var(--text-muted);">VS</span>
                    <div style="text-align:center"><div class="team-logo" style="width:52px;height:52px;margin:0 auto 0.4rem;">${m.team2.logo}</div><span style="font-weight:600;font-size:0.95rem;">${m.team2.name}</span></div>
                </div>
                ${isLoggedIn ? predSection : '<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;">Connectez-vous pour pronostiquer</p>'}
            </div>`;
        }).join('');

        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Prédictions</h1><p class="section-subtitle">Pronostiquez les matchs à venir du RLCS</p></div></div>
        ${upcomingCards}`;
    },

    // Knowledge Base View (Hitboxes & Maps)
    KnowledgeBaseView: () => {
        const hitboxes = window.RLData.HITBOXES || [];
        const maps = window.RLData.MAPS || [];
        
        const hitboxHtml = hitboxes.sort((a,b) => b.usage - a.usage).map((h, i) => `
            <div class="match-item fade-in" style="flex-direction:column;align-items:flex-start;animation-delay:${i * 0.05}s">
                <div style="display:flex;justify-content:space-between;width:100%;margin-bottom:1rem;">
                    <span style="font-family:var(--font-heading);font-weight:900;font-size:1.3rem;color:var(--accent-blue);">${h.name}</span>
                    <span class="badge" style="background:rgba(255,107,0,0.1);color:var(--accent-orange);">Utilisation Pro : ${h.usage}%</span>
                </div>
                
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(120px, 1fr));gap:1rem;width:100%;margin-bottom:1rem;background:rgba(0,0,0,0.2);padding:1rem;border-radius:var(--radius-sm);">
                    <div style="text-align:center;">
                        <div style="font-size:1.4rem;font-weight:900;color:${h.winRate > 50 ? 'var(--accent-blue)' : 'var(--text-main)'}">${h.winRate}%</div>
                        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;">Winrate</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:1.4rem;font-weight:900;">${h.goalsPerGame}</div>
                        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;">Buts/Game</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:1.4rem;font-weight:900;">${h.savesPerGame}</div>
                        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;">Arrêts/Game</div>
                    </div>
                    <div style="text-align:center;">
                        <div style="font-size:1.4rem;font-weight:900;color:var(--accent-orange);">${h.mvpPercentage}%</div>
                        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;">Taux de MVP</div>
                    </div>
                </div>

                <div style="display:flex;gap:1.5rem;font-size:0.85rem;color:var(--text-muted);margin-bottom:0.75rem;">
                    <span>📐 Longueur: ${h.length}</span>
                    <span>📏 Largeur: ${h.width}</span>
                    <span>↕️ Hauteur: ${h.height}</span>
                </div>
                <div style="font-size:0.8rem;color:var(--text-main);">
                    <strong>Voitures :</strong> ${h.cars.join(', ')}
                </div>
            </div>
        `).join('');

        const mapHtml = maps.map((m, i) => `
            <div class="player-card fade-in" style="animation-delay:${i * 0.05}s;padding:0;overflow:hidden;min-height:160px;position:relative;">
                <div style="position:absolute;inset:0;background:url('${m.image}') center/cover;opacity:0.4;"></div>
                <div style="position:absolute;inset:0;background:linear-gradient(to top, var(--bg-card), transparent);"></div>
                <div style="position:absolute;bottom:0;left:0;right:0;padding:1rem;">
                    <h3 style="margin:0;font-family:var(--font-heading);font-size:1.1rem;text-shadow:0 2px 4px rgba(0,0,0,0.8);">${m.name}</h3>
                    <span style="font-size:0.8rem;color:var(--text-muted);">${m.environment}</span>
                </div>
            </div>
        `).join('');

        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Encyclopédie</h1><p class="section-subtitle">Données techniques et hitboxes officielles</p></div></div>
        
        <h2 style="margin-bottom:1.25rem;font-family:var(--font-heading)" class="fade-in">Hitboxes & Statistiques</h2>
        <div class="card fade-in" style="margin-bottom:2rem;">
            ${hitboxHtml}
        </div>
        
        <h2 style="margin-bottom:1.25rem;font-family:var(--font-heading)" class="fade-in">Arènes (Maps)</h2>
        <div class="player-list fade-in">
            ${mapHtml}
        </div>`;
    },

    // Replay Studio View
    ReplayStudioView: () => {
        return `
        <div class="section-header fade-in"><div><h1 class="section-title">Replay Studio</h1><p class="section-subtitle">Laboratoire d'analyse de fichiers .replay</p></div></div>
        
        <div class="card fade-in" style="text-align:center;padding:3rem 1rem;border: 2px dashed rgba(255,255,255,0.1);" id="drop-zone">
            <i data-lucide="upload-cloud" style="width:48px;height:48px;color:var(--accent-blue);margin-bottom:1rem;"></i>
            <h2 style="margin-bottom:0.5rem;font-family:var(--font-heading)">Glissez un fichier .replay ici</h2>
            <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem;">Ou cliquez pour parcourir vos fichiers locaux.</p>
            <input type="file" id="replay-file-input" accept=".replay" style="display:none;">
            <button class="btn-auth" onclick="document.getElementById('replay-file-input').click()">Sélectionner un fichier</button>
        </div>

        <div id="replay-loading" style="display:none;text-align:center;margin-top:2rem;">
            <div class="loader" style="margin:0 auto 1rem;"></div>
            <p style="color:var(--accent-blue);">Décryptage du fichier binaire...</p>
        </div>

        <div id="replay-results" style="display:none;margin-top:2rem;" class="fade-in">
            <h2 style="margin-bottom:1rem;font-family:var(--font-heading)">Résultats de l'analyse</h2>
            <div class="card">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem;">
                    <div>
                        <h4 style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">Fichier</h4>
                        <p id="res-filename" style="font-weight:bold;"></p>
                    </div>
                    <div>
                        <h4 style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;">Match GUID</h4>
                        <p id="res-guid" style="font-family:monospace;font-size:0.85rem;color:var(--accent-orange);"></p>
                    </div>
                </div>
                <div class="match-item" style="justify-content:center;gap:2rem;">
                    <div style="text-align:right;">
                        <span id="res-blue-name" style="font-weight:700;color:var(--accent-blue);font-size:1.2rem;"></span>
                    </div>
                    <div style="font-size:2rem;font-weight:900;font-family:var(--font-heading);">
                        <span id="res-blue-score"></span> - <span id="res-orange-score"></span>
                    </div>
                    <div style="text-align:left;">
                        <span id="res-orange-name" style="font-weight:700;color:var(--accent-orange);font-size:1.2rem;"></span>
                    </div>
                </div>
                
                <div style="margin-top:2rem;text-align:center;padding:2rem;background:rgba(255,255,255,0.02);border-radius:var(--radius-md);">
                    <i data-lucide="monitor-play" style="width:32px;height:32px;color:var(--text-muted);margin-bottom:1rem;"></i>
                    <h3 style="color:var(--text-muted);">Visualiseur Frame-by-Frame 2D</h3>
                    <p style="font-size:0.85rem;color:var(--text-muted);max-width:400px;margin:0.5rem auto;">Le tracking frame-by-frame complet nécessite le moteur Boxcars (WebAssembly). Ce module de démonstration affiche les métadonnées de l'en-tête (Header).</p>
                </div>
            </div>
        </div>
        `;
    }
};
