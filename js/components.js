window.Components = {
    // Render a single match card
    MatchCard: (match) => {
        const isTeam1Winner = match.team1.score > match.team2.score;
        return `
        <div class="match-item fade-in" data-id="${match.id}">
            <div class="team left">
                <div class="team-logo">${match.team1.logo}</div>
                <span class="team-name">${match.team1.name}</span>
            </div>
            
            <div class="score-board">
                <span class="match-event">${match.event} • ${match.date}</span>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <span class="score ${isTeam1Winner ? 'blue-win' : ''}">${match.team1.score}</span>
                    <span style="color: var(--text-muted); font-weight: bold;">-</span>
                    <span class="score ${!isTeam1Winner ? 'orange-win' : ''}">${match.team2.score}</span>
                </div>
                <span style="font-size: 0.8rem; color: var(--text-muted)">${match.duration}</span>
            </div>
            
            <div class="team right">
                <div class="team-logo">${match.team2.logo}</div>
                <span class="team-name">${match.team2.name}</span>
            </div>
        </div>
        `;
    },

    // Render a player card
    PlayerCard: (player) => {
        const isFav = window.Auth ? window.Auth.isFavorite('players', player.id) : false;
        const favIconClass = isFav ? 'active' : '';
        const heartIcon = isFav ? '<i data-lucide="heart" style="fill: var(--danger)"></i>' : '<i data-lucide="heart"></i>';

        return `
        <div class="player-card fade-in" data-id="${player.id}">
            <button class="favorite-btn ${favIconClass}" onclick="window.app.toggleFavorite(event, 'players', '${player.id}')">
                ${heartIcon}
            </button>
            <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
            <h3 class="player-name">${player.name}</h3>
            <span class="player-team">${player.team}</span>
            
            <div class="player-stats-mini">
                <div class="stat-item">
                    <span class="stat-value dpm-highlight">${player.stats.dpm}</span>
                    <span class="stat-label">DPM</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${player.stats.goalsPerGame}</span>
                    <span class="stat-label">Buts/G</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${player.stats.savesPerGame}</span>
                    <span class="stat-label">Arrêts/G</span>
                </div>
            </div>
        </div>
        `;
    },

    // Render Home View
    HomeView: async () => {
        const PLAYERS = await window.Api.getPlayers();
        const MATCHES = await window.Api.getMatches();

        const recentMatches = MATCHES.slice(0, 3).map(m => window.Components.MatchCard(m)).join('');
        const topPlayers = PLAYERS.slice(0, 4).map(p => window.Components.PlayerCard(p)).join('');
        
        return `
        <div class="section-header fade-in">
            <div>
                <h1 class="section-title">Dashboard</h1>
                <p class="section-subtitle">Aperçu général de la scène esport Rocket League</p>
            </div>
        </div>
        
        <div class="dashboard-grid">
            <div class="card col-span-8 fade-in" style="animation-delay: 0.1s">
                <h2 style="margin-bottom: 1.5rem; font-family: var(--font-heading); color: var(--accent-blue)">Matchs Récents</h2>
                <div class="matches-list">
                    ${recentMatches}
                </div>
                <button class="btn-back" style="margin-top: 1rem;" onclick="window.navigate('history')">
                    Voir tout l'historique <i data-lucide="arrow-right"></i>
                </button>
            </div>
            
            <div class="card col-span-4 fade-in" style="animation-delay: 0.2s">
                <h2 style="margin-bottom: 1.5rem; font-family: var(--font-heading); color: var(--accent-orange)">Stats Globales</h2>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="stat-box" style="padding: 1rem; flex-direction: row; justify-content: space-between;">
                        <span style="color: var(--text-muted)">Démolitions Totales</span>
                        <span style="font-weight: bold; font-size: 1.2rem; color: var(--danger)">4,521</span>
                    </div>
                    <div class="stat-box" style="padding: 1rem; flex-direction: row; justify-content: space-between;">
                        <span style="color: var(--text-muted)">Buts Marqués</span>
                        <span style="font-weight: bold; font-size: 1.2rem; color: var(--accent-blue)">1,204</span>
                    </div>
                    <div class="stat-box" style="padding: 1rem; flex-direction: row; justify-content: space-between;">
                        <span style="color: var(--text-muted)">Arrêts Épiques</span>
                        <span style="font-weight: bold; font-size: 1.2rem; color: var(--accent-orange)">856</span>
                    </div>
                </div>
            </div>
            
            <div class="card col-span-12 fade-in" style="animation-delay: 0.3s">
                <h2 style="margin-bottom: 1.5rem; font-family: var(--font-heading)">Joueurs en Tendance</h2>
                <div class="player-list">
                    ${topPlayers}
                </div>
            </div>
        </div>
        `;
    },

    // Render History View
    HistoryView: async () => {
        const MATCHES = await window.Api.getMatches();
        const allMatches = MATCHES.map(m => window.Components.MatchCard(m)).join('');
        return `
        <div class="section-header fade-in">
            <div>
                <h1 class="section-title">Historique RLCS</h1>
                <p class="section-subtitle">Tous les matchs professionnels récents</p>
            </div>
        </div>
        <div class="card fade-in">
            ${allMatches}
        </div>
        `;
    },

    // Render Players View
    PlayersView: async () => {
        const PLAYERS = await window.Api.getPlayers();
        const allPlayers = PLAYERS.map(p => window.Components.PlayerCard(p)).join('');
        return `
        <div class="section-header fade-in">
            <div>
                <h1 class="section-title">Joueurs Pro</h1>
                <p class="section-subtitle">Statistiques détaillées de tous les joueurs (DPM, Buts, etc.)</p>
            </div>
        </div>
        <div class="player-list fade-in">
            ${allPlayers}
        </div>
        `;
    },
    
    // Render Player Detail View
    PlayerDetailView: async (playerId) => {
        const PLAYERS = await window.Api.getPlayers();
        const player = PLAYERS.find(p => p.id === playerId);
        if(!player) return `<h2>Joueur introuvable</h2>`;
        
        const isFav = window.Auth ? window.Auth.isFavorite('players', player.id) : false;
        const heartIcon = isFav ? '<i data-lucide="heart" style="fill: var(--danger)"></i>' : '<i data-lucide="heart"></i>';

        return `
        <button class="btn-back fade-in" onclick="window.navigate('players')">
            <i data-lucide="arrow-left"></i> Retour aux joueurs
        </button>
        
        <div class="detail-header fade-in" style="position: relative;">
            <button class="favorite-btn ${isFav ? 'active' : ''}" style="top: 2rem; right: 2rem; width: 50px; height: 50px;" onclick="window.app.toggleFavorite(event, 'players', '${player.id}')">
                ${heartIcon}
            </button>
            <img src="${player.avatar}" alt="${player.name}" class="detail-avatar">
            <div class="detail-info">
                <h1>${player.name}</h1>
                <p>${player.team}</p>
            </div>
        </div>
        
        <h2 style="margin-bottom: 1.5rem; font-family: var(--font-heading)" class="fade-in">Statistiques par Match (Moyenne)</h2>
        <div class="stat-grid fade-in" style="animation-delay: 0.1s">
            <div class="stat-box">
                <i data-lucide="flame"></i>
                <span class="stat-value dpm-highlight" style="font-size: 2.5rem">${player.stats.dpm}</span>
                <span class="stat-label">Démos Par Minute (DPM)</span>
            </div>
            <div class="stat-box">
                <i data-lucide="target"></i>
                <span class="stat-value" style="font-size: 2.5rem">${player.stats.goalsPerGame}</span>
                <span class="stat-label">Buts</span>
            </div>
            <div class="stat-box">
                <i data-lucide="share-2"></i>
                <span class="stat-value" style="font-size: 2.5rem">${player.stats.assistsPerGame}</span>
                <span class="stat-label">Passes Décisives</span>
            </div>
            <div class="stat-box">
                <i data-lucide="shield"></i>
                <span class="stat-value" style="font-size: 2.5rem">${player.stats.savesPerGame}</span>
                <span class="stat-label">Arrêts</span>
            </div>
            <div class="stat-box">
                <i data-lucide="activity"></i>
                <span class="stat-value" style="font-size: 2.5rem">${player.stats.scorePerGame}</span>
                <span class="stat-label">Score Global</span>
            </div>
            <div class="stat-box">
                <i data-lucide="crosshair"></i>
                <span class="stat-value" style="font-size: 2.5rem">${player.stats.shotPercentage}%</span>
                <span class="stat-label">Précision Tirs</span>
            </div>
        </div>

        <div class="fade-in" style="animation-delay: 0.2s; margin-top: 3rem; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; align-items: center;">
            <h2 style="margin-bottom: 1.5rem; font-family: var(--font-heading)">Radar de Performance</h2>
            <div style="width: 100%; max-width: 500px; position: relative;">
                <canvas id="playerRadarChart"></canvas>
            </div>
        </div>
        `;
    },

    // Render Teams Standings View
    TeamsView: async () => {
        const TEAMS = await window.Api.getTeams();
        const teamsList = TEAMS.sort((a, b) => a.rank - b.rank).map(t => {
            const isFav = window.Auth ? window.Auth.isFavorite('teams', t.id) : false;
            const heartIcon = isFav ? '<i data-lucide="heart" style="fill: var(--danger)"></i>' : '<i data-lucide="heart"></i>';

            return `
            <div class="match-item fade-in" style="justify-content: flex-start; gap: 2rem; position: relative;">
                <button class="favorite-btn ${isFav ? 'active' : ''}" style="top: 50%; right: 1rem; transform: translateY(-50%);" onclick="window.app.toggleFavorite(event, 'teams', '${t.id}')">
                    ${heartIcon}
                </button>
                <div style="font-size: 1.5rem; font-family: var(--font-heading); font-weight: bold; width: 40px; color: ${t.rank <= 3 ? 'var(--accent-orange)' : 'var(--text-muted)'}">#${t.rank}</div>
                <div class="team-logo">${t.logo}</div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <span style="font-size: 1.2rem; font-weight: bold;">${t.name}</span>
                    <span style="font-size: 0.85rem; color: var(--text-muted)">Région: ${t.region}</span>
                </div>
                <div class="stat-box" style="padding: 0.5rem 1rem; border: none; background: rgba(0, 229, 255, 0.1);">
                    <span style="font-weight: bold; color: var(--accent-blue)">${t.points} pts</span>
                </div>
                <div class="stat-box" style="padding: 0.5rem 1rem; border: none; background: rgba(0,0,0,0.3); margin-right: 3rem;">
                    <span style="color: var(--text-muted)">Win Rate: <strong style="color: var(--text-main)">${t.winRate}%</strong></span>
                </div>
            </div>
            `
        }).join('');

        return `
        <div class="section-header fade-in">
            <div>
                <h1 class="section-title">Équipes & Power Rankings</h1>
                <p class="section-subtitle">Classement officiel actuel basé sur les points RLCS</p>
            </div>
        </div>
        <div class="card fade-in">
            ${teamsList}
        </div>
        `;
    },

    // Render Match Detail View
    MatchDetailView: async (matchId) => {
        const MATCHES = await window.Api.getMatches();
        const match = MATCHES.find(m => m.id === matchId);
        if(!match) return `<h2>Match introuvable</h2>`;

        const isTeam1Winner = match.team1.score > match.team2.score;

        let gamesHtml = '';
        if (match.games && match.games.length > 0) {
            gamesHtml = match.games.map(g => `
                <div class="match-item fade-in" style="margin-top: 1rem;">
                    <div style="width: 15%; color: var(--text-muted); font-family: var(--font-heading); font-weight: bold;">Game ${g.id.replace('g','')}</div>
                    <div style="flex: 1; text-align: right; font-weight: ${g.winner === match.team1.logo ? 'bold' : 'normal'}; color: ${g.winner === match.team1.logo ? 'var(--accent-blue)' : 'inherit'}">${match.team1.name}</div>
                    <div style="padding: 0 2rem; font-family: var(--font-heading); font-weight: 900;">
                        ${g.score1} - ${g.score2}
                    </div>
                    <div style="flex: 1; text-align: left; font-weight: ${g.winner === match.team2.logo ? 'bold' : 'normal'}; color: ${g.winner === match.team2.logo ? 'var(--accent-orange)' : 'inherit'}">${match.team2.name}</div>
                    <div style="width: 25%; text-align: right; color: var(--text-muted); font-size: 0.85rem;">📍 ${g.map}</div>
                </div>
            `).join('');
        } else {
            gamesHtml = `<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Détails des manches non disponibles pour ce match.</p>`;
        }

        // Mock a VOD URL
        const vodIframe = `
        <div style="margin-top: 2rem; text-align: center;">
            <h2 style="font-family: var(--font-heading); margin-bottom: 1rem;">Rediffusion (VOD)</h2>
            <iframe width="100%" height="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="RLCS VOD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 12px; border: 1px solid var(--border-color);"></iframe>
            <p style="color: var(--text-muted); margin-top: 1rem;">(Exemple de lecteur vidéo intégré)</p>
        </div>
        `;

        // Predictions Section
        const existingPrediction = window.Auth ? window.Auth.getPrediction(match.id) : null;
        let predictionHtml = '';
        
        if (existingPrediction) {
            predictionHtml = `
            <div class="card" style="margin-top: 2rem; background: rgba(0, 229, 255, 0.05); border-color: var(--accent-blue);">
                <h3 style="color: var(--accent-blue); margin-bottom: 1rem;"><i data-lucide="check-circle"></i> Votre Prédiction</h3>
                <p>Vous avez prédit une victoire de <strong>${existingPrediction.winner}</strong> sur un score de <strong>${existingPrediction.score1} - ${existingPrediction.score2}</strong>.</p>
            </div>
            `;
        } else {
            predictionHtml = `
            <div class="card" style="margin-top: 2rem;">
                <h3 style="margin-bottom: 1rem;">Faire une prédiction</h3>
                <div style="display: flex; gap: 1rem; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div class="team-logo" style="margin: 0 auto 0.5rem auto;">${match.team1.logo}</div>
                        <input type="number" id="pred-score1" min="0" max="4" style="width: 60px; padding: 0.5rem; text-align: center; background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); color: white; border-radius: 8px;">
                    </div>
                    <span style="font-weight: bold; font-size: 1.5rem;">-</span>
                    <div style="text-align: center;">
                        <div class="team-logo" style="margin: 0 auto 0.5rem auto;">${match.team2.logo}</div>
                        <input type="number" id="pred-score2" min="0" max="4" style="width: 60px; padding: 0.5rem; text-align: center; background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); color: white; border-radius: 8px;">
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1.5rem;">
                    <button class="btn-auth" onclick="window.app.savePrediction('${match.id}', '${match.team1.logo}', '${match.team2.logo}')">Valider mon pronostic</button>
                </div>
            </div>
            `;
        }


        return `
        <button class="btn-back fade-in" onclick="window.navigate('history')">
            <i data-lucide="arrow-left"></i> Retour à l'historique
        </button>

        <div class="detail-header fade-in" style="justify-content: space-around; text-align: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <div class="team-logo" style="width: 100px; height: 100px; font-size: 2rem;">${match.team1.logo}</div>
                <h2 style="color: ${isTeam1Winner ? 'var(--accent-blue)' : 'inherit'}">${match.team1.name}</h2>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center;">
                <span class="match-event" style="margin-bottom: 1rem;">${match.event}</span>
                <div style="font-size: 5rem; font-family: var(--font-heading); font-weight: 900; letter-spacing: 5px;">
                    <span class="${isTeam1Winner ? 'blue-win' : ''}">${match.team1.score}</span>
                    <span style="color: var(--text-muted)">-</span>
                    <span class="${!isTeam1Winner ? 'orange-win' : ''}">${match.team2.score}</span>
                </div>
                <span style="color: var(--text-muted); font-weight: bold;">${match.duration}</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <div class="team-logo" style="width: 100px; height: 100px; font-size: 2rem;">${match.team2.logo}</div>
                <h2 style="color: ${!isTeam1Winner ? 'var(--accent-orange)' : 'inherit'}">${match.team2.name}</h2>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card fade-in col-span-8" style="animation-delay: 0.1s;">
                <h2 style="font-family: var(--font-heading); margin-bottom: 1rem;">Détail des manches (Games)</h2>
                ${gamesHtml}
                ${vodIframe}
            </div>
            <div class="col-span-4 fade-in" style="animation-delay: 0.2s;">
                ${predictionHtml}
            </div>
        </div>
        `;
    }
};
