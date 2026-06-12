// Use window.Components
const Components = window.Components;

class App {
    constructor() {
        this.currentView = 'home';
        this.container = document.getElementById('view-container');
        this.navItems = document.querySelectorAll('.nav-item');
        
        this.init();
    }

    init() {
        // Setup global navigate function for inline event handlers
        window.navigate = (view, param = null) => this.navigate(view, param);
        
        // Setup navigation listeners
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                if (view) {
                    this.navigate(view);
                }
            });
        });

        this.attachSearchListener();
        this.setupAuthListeners();
        this.updateAuthUI();

        // Initial render
        this.render();
    }

    navigate(view, param = null) {
        this.currentView = view;
        this.currentParam = param;
        
        // Update active state in sidebar
        this.navItems.forEach(item => {
            if (item.getAttribute('data-view') === view) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        this.render();
    }

    render() {
        // Fade out slightly
        this.container.style.opacity = '0.5';
        
        setTimeout(async () => {
            let html = '';
            
            switch(this.currentView) {
                case 'home':
                    html = await Components.HomeView();
                    break;
                case 'history':
                    html = await Components.HistoryView();
                    break;
                case 'players':
                    html = await Components.PlayersView();
                    break;
                case 'teams':
                    html = await Components.TeamsView();
                    break;
                case 'player-detail':
                    html = await Components.PlayerDetailView(this.currentParam);
                    break;
                case 'match-detail':
                    html = await Components.MatchDetailView(this.currentParam);
                    break;
                default:
                    html = await Components.HomeView();
            }

            this.container.innerHTML = html;
            this.container.style.opacity = '1';
            
            // Re-initialize icons for newly injected HTML
            if (window.lucide) {
                window.lucide.createIcons();
            }

            // Init Chart if canvas is present
            if (this.currentView === 'player-detail') {
                this.initPlayerRadarChart(this.currentParam);
            }

            // Attach event listeners for dynamic elements
            this.attachDynamicListeners();
            
        }, 150); // slight delay for smooth transition effect
    }

    initPlayerRadarChart(playerId) {
        const player = window.RLData.PLAYERS.find(p => p.id === playerId);
        const canvas = document.getElementById('playerRadarChart');
        if (!player || !canvas) return;

        // Normalize values to 0-100 for better radar visualization
        // Max values based on typical pro performance
        const data = [
            (player.stats.dpm / 3.0) * 100, // Max 3.0 DPM
            (player.stats.goalsPerGame / 1.5) * 100, // Max 1.5
            (player.stats.assistsPerGame / 1.5) * 100, // Max 1.5
            (player.stats.savesPerGame / 2.5) * 100, // Max 2.5
            (player.stats.shotPercentage / 40.0) * 100 // Max 40%
        ].map(v => Math.min(v, 100)); // Cap at 100

        new Chart(canvas, {
            type: 'radar',
            data: {
                labels: ['Démos', 'Buts', 'Passes', 'Arrêts', 'Précision'],
                datasets: [{
                    label: player.name,
                    data: data,
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    borderColor: '#00E5FF',
                    pointBackgroundColor: '#FF6B00',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#FF6B00',
                    borderWidth: 2
                }, {
                    label: 'Moyenne Pro',
                    data: [50, 50, 50, 50, 50],
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    borderDash: [5, 5]
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: {
                            color: '#8E9BB0',
                            font: { family: 'Outfit', size: 14 }
                        },
                        ticks: { display: false, max: 100, min: 0 }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#FFF', font: { family: 'Inter' } }
                    }
                }
            }
        });
    }

    attachDynamicListeners() {
        // Player card clicks -> navigate to player detail
        const playerCards = document.querySelectorAll('.player-card');
        playerCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                this.navigate('player-detail', id);
            });
        });

        // Match card clicks -> navigate to match detail
        // Ensure we only attach to match cards in history/home, not within the match detail itself if there are similar classes
        const matchCards = document.querySelectorAll('.match-item');
        matchCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                // Some match-items (like in team standings or game details) might not have data-id for match
                if (id) {
                    this.navigate('match-detail', id);
                }
            });
        });
    }

    attachSearchListener() {
        const searchInput = document.querySelector('.search-bar input');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Global search: filter player cards and match items if they exist in the current DOM
            const playerCards = document.querySelectorAll('.player-card');
            playerCards.forEach(card => {
                const name = card.querySelector('.player-name')?.textContent.toLowerCase() || '';
                const team = card.querySelector('.player-team')?.textContent.toLowerCase() || '';
                if (name.includes(query) || team.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            const matchItems = document.querySelectorAll('.match-item');
            matchItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Auth & UI Updates
    updateAuthUI() {
        const profileContainer = document.getElementById('user-profile-container');
        if (!profileContainer) return;

        if (window.Auth.isLoggedIn()) {
            const user = window.Auth.getUser();
            profileContainer.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-weight: bold; color: var(--accent-blue)">${user.username}</span>
                    <img src="${user.avatar}" alt="User Profile" onclick="window.app.logout()" title="Déconnexion" style="cursor: pointer;">
                </div>
            `;
        } else {
            profileContainer.innerHTML = `
                <button class="btn-auth" onclick="document.getElementById('login-modal').style.display='flex'">Se Connecter</button>
            `;
        }
    }

    setupAuthListeners() {
        document.getElementById('btn-cancel-login').addEventListener('click', () => {
            document.getElementById('login-modal').style.display = 'none';
        });

        document.getElementById('btn-confirm-login').addEventListener('click', () => {
            const username = document.getElementById('login-username').value;
            if (username.trim().length > 2) {
                window.Auth.login(username);
                document.getElementById('login-modal').style.display = 'none';
                this.updateAuthUI();
                this.render(); // re-render to update favorites state
            }
        });
    }

    logout() {
        if(confirm('Voulez-vous vraiment vous déconnecter ?')) {
            window.Auth.logout();
            this.updateAuthUI();
            this.render();
        }
    }

    toggleFavorite(e, type, id) {
        e.stopPropagation();
        if (!window.Auth.isLoggedIn()) {
            alert('Veuillez vous connecter pour ajouter des favoris.');
            document.getElementById('login-modal').style.display = 'flex';
            return;
        }
        window.Auth.toggleFavorite(type, id);
        this.render();
    }

    savePrediction(matchId, team1Logo, team2Logo) {
        if (!window.Auth.isLoggedIn()) {
            alert('Veuillez vous connecter pour faire un pronostic.');
            document.getElementById('login-modal').style.display = 'flex';
            return;
        }

        const score1Str = document.getElementById('pred-score1').value;
        const score2Str = document.getElementById('pred-score2').value;

        if (score1Str === '' || score2Str === '') {
            alert('Veuillez entrer un score pour les deux équipes.');
            return;
        }

        const score1 = parseInt(score1Str);
        const score2 = parseInt(score2Str);

        let winner = null;
        if (score1 > score2) winner = team1Logo;
        else if (score2 > score1) winner = team2Logo;
        else {
            alert('Il ne peut pas y avoir de match nul en RLCS.');
            return;
        }

        window.Auth.savePrediction(matchId, winner, score1, score2);
        this.render(); // Re-render to show the saved prediction UI
    }
}

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    
    // Initial icons rendering
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
