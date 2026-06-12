import { MinimapEngine } from './minimap.js';

const Components = window.Components;

class App {
    constructor() {
        this.currentView = 'home';
        this.currentParam = null;
        this.container = document.getElementById('view-container');
        this.navItems = document.querySelectorAll('.nav-item');
        this.minimap = null;
        this.init();
    }

    init() {
        window.navigate = (view, param = null) => this.navigate(view, param);

        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                if (view) this.navigate(view);
            });
        });

        this.attachSearchListener();
        this.setupAuthListeners();
        this.updateAuthUI();
        this.render();
    }

    navigate(view, param = null) {
        this.currentView = view;
        this.currentParam = param;
        this.navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === view);
        });
        this.render();
    }

    async render() {
        this.container.style.opacity = '0.3';
        this.container.style.transition = 'opacity 0.15s';

        // Small delay for visual smoothness
        await new Promise(r => setTimeout(r, 100));

        let html = '';
        try {
            switch (this.currentView) {
                case 'home': html = await Components.HomeView(); break;
                case 'history': html = await Components.HistoryView(); break;
                case 'players': html = await Components.PlayersView(); break;
                case 'teams': html = await Components.TeamsView(); break;
                case 'player-detail': html = await Components.PlayerDetailView(this.currentParam); break;
                case 'match-detail': html = await Components.MatchDetailView(this.currentParam); break;
                case 'predictions': html = await Components.PredictionsView(); break;
                case 'knowledge': html = Components.KnowledgeBaseView(); break;
                case 'replay': html = Components.ReplayStudioView(); break;
                default: html = await Components.HomeView();
            }
        } catch (e) {
            console.error('Render error:', e);
            html = `<div class="card"><h2>Erreur de chargement</h2><p style="color:var(--text-muted);">${e.message}</p></div>`;
        }

        this.container.innerHTML = html;
        this.container.style.opacity = '1';

        if (window.lucide) window.lucide.createIcons();
        if (this.currentView === 'player-detail') this.initPlayerRadarChart(this.currentParam);
        if (this.currentView === 'replay') this.initReplayStudio();
        this.attachDynamicListeners();

        // Hide loading overlay on first render
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.add('hidden');
    }

    initPlayerRadarChart(playerId) {
        const player = window.RLData.PLAYERS.find(p => p.id === playerId);
        const canvas = document.getElementById('playerRadarChart');
        if (!player || !canvas) return;

        const data = [
            (player.stats.goalsPerGame / 1.2) * 100,
            (player.stats.assistsPerGame / 1.0) * 100,
            (player.stats.savesPerGame / 2.5) * 100,
            ((player.stats.shotPct || player.stats.shotPercentage || 0) / 40.0) * 100,
            ((player.stats.rating || 1.0) / 1.6) * 100,
            (player.stats.dpm / 0.5) * 100
        ].map(v => Math.min(v, 100));

        new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['Buts', 'Passes', 'Arrêts', 'Précision', 'Rating', 'Démos'],
                datasets: [{
                    label: player.name,
                    data: data,
                    backgroundColor: 'rgba(0,229,255,0.15)',
                    borderColor: '#00E5FF',
                    pointBackgroundColor: '#FF6B00',
                    pointBorderColor: '#fff',
                    borderWidth: 2
                }, {
                    label: 'Moyenne Pro',
                    data: [50, 50, 50, 50, 50],
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderWidth: 1, borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255,255,255,0.08)' },
                        grid: { color: 'rgba(255,255,255,0.08)' },
                        pointLabels: { color: '#6B7A90', font: { family: 'Outfit', size: 13 } },
                        ticks: { display: false, max: 100, min: 0 }
                    }
                },
                plugins: {
                    legend: { labels: { color: '#F0F2F5', font: { family: 'Inter' } } }
                }
            }
        });
    }

    initReplayStudio() {
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('replay-file-input');
        if (!dropZone || !fileInput) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
            dropZone.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); });
        });

        dropZone.addEventListener('dragover', () => dropZone.style.borderColor = 'var(--accent-blue)');
        dropZone.addEventListener('dragleave', () => dropZone.style.borderColor = 'rgba(255,255,255,0.1)');
        dropZone.addEventListener('drop', (e) => {
            dropZone.style.borderColor = 'rgba(255,255,255,0.1)';
            const files = e.dataTransfer.files;
            if (files.length) this.handleReplayFile(files[0]);
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) this.handleReplayFile(e.target.files[0]);
        });
    }

    async handleReplayFile(file) {
        if (!file.name.endsWith('.replay')) {
            window.showToast("Ce n'est pas un fichier .replay valide", 'error');
            return;
        }

        document.getElementById('replay-loading').style.display = 'block';
        document.getElementById('replay-results').style.display = 'none';

        try {
            const data = await window.ReplayParser.parse(file);
            
            document.getElementById('res-filename').innerHTML = `
                <strong>${data.filename}</strong> (${data.size})<br/>
                <span style="font-size: 0.9em; color: var(--text-muted);">
                    Map: ${data.mapName || 'Inconnu'} &bull; Date: ${data.date || 'Inconnu'}
                </span>
            `;
            document.getElementById('res-guid').textContent = data.matchGuid;
            document.getElementById('res-blue-name').textContent = data.teamBlue.name;
            document.getElementById('res-blue-score').textContent = data.teamBlue.score;
            document.getElementById('res-orange-name').textContent = data.teamOrange.name;
            document.getElementById('res-orange-score').textContent = data.teamOrange.score;
            
            const framesEl = document.getElementById('res-frames');
            if (framesEl) framesEl.textContent = data.framesCount + " frames décryptées";

            // Extract PlayerStats if available
            const props = data.props || {};
            const playerStatsEl = document.getElementById('res-player-stats');
            if (playerStatsEl) {
                let statsHtml = '';
                
                let statsArray = props.PlayerStats;
                if (statsArray && statsArray.array) statsArray = statsArray.array;
                
                if (Array.isArray(statsArray) && statsArray.length > 0) {
                    statsArray.forEach(p => {
                        const name = p.Name || 'Inconnu';
                        const score = p.Score || 0;
                        const goals = p.Goals || 0;
                        const assists = p.Assists || 0;
                        const saves = p.Saves || 0;
                        const shots = p.Shots || 0;
                        const team = p.Team || 0;
                        const color = team === 0 ? 'var(--accent-blue)' : 'var(--accent-orange)';
                        
                        statsHtml += `
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                <td style="padding:0.75rem;font-weight:bold;color:${color};">${name}</td>
                                <td style="padding:0.75rem;">${score}</td>
                                <td style="padding:0.75rem;">${goals}</td>
                                <td style="padding:0.75rem;">${assists}</td>
                                <td style="padding:0.75rem;">${saves}</td>
                                <td style="padding:0.75rem;">${shots}</td>
                            </tr>
                        `;
                    });
                } else {
                    statsHtml = '<tr><td colspan="6" style="padding:1rem;text-align:center;color:var(--text-muted);">Aucune statistique de joueur trouvée dans ce fichier.</td></tr>';
                }
                playerStatsEl.innerHTML = statsHtml;
            }

            // Raw JSON Viewer
            const rawJsonEl = document.getElementById('res-raw-json');
            if (rawJsonEl) {
                rawJsonEl.textContent = JSON.stringify(props, null, 2);
            }

            document.getElementById('replay-loading').style.display = 'none';
            document.getElementById('replay-results').style.display = 'block';
            
            // Initialize MinimapEngine and load frames
            if (!this.minimap) {
                this.minimap = new MinimapEngine('replay-canvas');
            }
            // `data.framesData` is from subtr-actor get_replay_frames_data
            // `data.raw.network_frames` is the raw json parsed by parse_replay
            this.minimap.loadData(data.framesData, data.raw.network_frames);
            
            window.showToast("Fichier décrypté avec succès !", "success");
        } catch (e) {
            document.getElementById('replay-loading').style.display = 'none';
            window.showToast(e.message, 'error');
        }
    }

    attachDynamicListeners() {
        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                if (id) this.navigate('player-detail', id);
            });
        });
        document.querySelectorAll('.match-item[data-id]').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                if (id) this.navigate('match-detail', id);
            });
        });
    }

    attachSearchListener() {
        const searchInput = document.getElementById('global-search');
        if (!searchInput) return;
        searchInput.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            document.querySelectorAll('.player-card').forEach(c => {
                const text = c.textContent.toLowerCase();
                c.style.display = text.includes(q) ? 'flex' : 'none';
            });
            document.querySelectorAll('.match-item').forEach(c => {
                const text = c.textContent.toLowerCase();
                c.style.display = text.includes(q) ? 'flex' : 'none';
            });
        });
    }

    updateAuthUI() {
        const container = document.getElementById('user-profile-container');
        if (!container) return;
        if (window.Auth && window.Auth.isLoggedIn()) {
            const user = window.Auth.getUser();
            container.innerHTML = `
                <span style="font-weight:600;color:var(--accent-blue);font-size:0.9rem;">${user.username}</span>
                <img src="${user.avatar}" alt="Profile" onclick="window.app.logout()" title="Cliquer pour se déconnecter">
            `;
        } else {
            container.innerHTML = `<button class="btn-auth" onclick="document.getElementById('login-modal').style.display='flex'">Se Connecter</button>`;
        }
    }

    setupAuthListeners() {
        const cancelBtn = document.getElementById('btn-cancel-login');
        const confirmBtn = document.getElementById('btn-confirm-login');
        const usernameInput = document.getElementById('login-username');

        if (cancelBtn) cancelBtn.addEventListener('click', () => {
            document.getElementById('login-modal').style.display = 'none';
        });

        if (confirmBtn) confirmBtn.addEventListener('click', async () => {
            const username = usernameInput.value.trim();
            if (username.length < 3) { window.showToast('Le pseudo doit faire au moins 3 caractères.', 'error'); return; }
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'Connexion...';
            try {
                await window.Auth.login(username);
                document.getElementById('login-modal').style.display = 'none';
                this.updateAuthUI();
                this.render();
                window.showToast(`Bienvenue, ${username} !`, 'success');
            } catch (e) {
                window.showToast('Erreur de connexion : ' + e.message, 'error');
            }
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Se Connecter';
        });

        // Enter key support
        if (usernameInput) usernameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') confirmBtn.click();
        });
    }

    async logout() {
        if (confirm('Se déconnecter ?')) {
            await window.Auth.logout();
            this.updateAuthUI();
            this.render();
            window.showToast('Déconnecté.', 'info');
        }
    }

    async toggleFavorite(e, type, id) {
        e.stopPropagation();
        if (!window.Auth || !window.Auth.isLoggedIn()) {
            window.showToast('Connectez-vous pour ajouter des favoris.', 'info');
            document.getElementById('login-modal').style.display = 'flex';
            return;
        }
        await window.Auth.toggleFavorite(type, id);
        const wasFav = window.Auth.isFavorite(type, id);
        window.showToast(wasFav ? 'Ajouté aux favoris ❤️' : 'Retiré des favoris', 'success');
        this.render();
    }

    async savePrediction(matchId, team1Logo, team2Logo) {
        if (!window.Auth || !window.Auth.isLoggedIn()) {
            window.showToast('Connectez-vous pour pronostiquer.', 'info');
            document.getElementById('login-modal').style.display = 'flex';
            return;
        }
        const s1 = parseInt(document.getElementById('pred-score1')?.value);
        const s2 = parseInt(document.getElementById('pred-score2')?.value);
        if (isNaN(s1) || isNaN(s2)) { window.showToast('Entrez un score valide.', 'error'); return; }
        if (s1 === s2) { window.showToast('Pas de match nul en RLCS !', 'error'); return; }
        const winner = s1 > s2 ? team1Logo : team2Logo;
        await window.Auth.savePrediction(matchId, winner, s1, s2);
        window.showToast('Pronostic enregistré ! 🎯', 'success');
        this.render();
    }

    async savePredictionFromList(matchId, team1Logo, team2Logo) {
        if (!window.Auth || !window.Auth.isLoggedIn()) {
            window.showToast('Connectez-vous pour pronostiquer.', 'info');
            document.getElementById('login-modal').style.display = 'flex';
            return;
        }
        const s1 = parseInt(document.getElementById(`pred-${matchId}-1`)?.value);
        const s2 = parseInt(document.getElementById(`pred-${matchId}-2`)?.value);
        if (isNaN(s1) || isNaN(s2)) { window.showToast('Entrez un score valide.', 'error'); return; }
        if (s1 === s2) { window.showToast('Pas de match nul en RLCS !', 'error'); return; }
        const winner = s1 > s2 ? team1Logo : team2Logo;
        await window.Auth.savePrediction(matchId, winner, s1, s2);
        window.showToast('Pronostic enregistré ! 🎯', 'success');
        this.render();
    }
}

// Initialize immediately since ES modules are deferred and DOM is already ready
window.app = new App();
if (window.lucide) window.lucide.createIcons();
