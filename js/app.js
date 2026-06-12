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
        
        setTimeout(() => {
            let html = '';
            
            switch(this.currentView) {
                case 'home':
                    html = Components.HomeView();
                    break;
                case 'history':
                    html = Components.HistoryView();
                    break;
                case 'players':
                    html = Components.PlayersView();
                    break;
                case 'teams':
                    html = Components.TeamsView();
                    break;
                case 'player-detail':
                    html = Components.PlayerDetailView(this.currentParam);
                    break;
                case 'match-detail':
                    html = Components.MatchDetailView(this.currentParam);
                    break;
                default:
                    html = Components.HomeView();
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
}

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    
    // Initial icons rendering
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
