// Authentication and User Data Management (Simulated Backend)

class AuthService {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('rl_user')) || null;
        // User structure: { username: string, email: string, avatar: string, favorites: { players: [], teams: [] }, predictions: {} }
    }

    login(username) {
        this.user = {
            username: username,
            email: `${username.toLowerCase()}@example.com`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            favorites: { players: [], teams: [] },
            predictions: {}
        };
        this.save();
        return this.user;
    }

    logout() {
        this.user = null;
        localStorage.removeItem('rl_user');
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getUser() {
        return this.user;
    }

    toggleFavorite(type, id) {
        if (!this.user) return false;
        if (!this.user.favorites[type]) this.user.favorites[type] = [];
        
        const index = this.user.favorites[type].indexOf(id);
        if (index > -1) {
            this.user.favorites[type].splice(index, 1);
        } else {
            this.user.favorites[type].push(id);
        }
        this.save();
        return true;
    }

    isFavorite(type, id) {
        if (!this.user || !this.user.favorites[type]) return false;
        return this.user.favorites[type].includes(id);
    }

    savePrediction(matchId, predictedWinnerLogo, predictedScore1, predictedScore2) {
        if (!this.user) return false;
        this.user.predictions[matchId] = {
            winner: predictedWinnerLogo,
            score1: predictedScore1,
            score2: predictedScore2,
            timestamp: new Date().toISOString()
        };
        this.save();
        return true;
    }

    getPrediction(matchId) {
        if (!this.user) return null;
        return this.user.predictions[matchId] || null;
    }

    save() {
        localStorage.setItem('rl_user', JSON.stringify(this.user));
    }
}

window.Auth = new AuthService();
