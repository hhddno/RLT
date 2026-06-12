// Data fetching layer — Instant local data (no broken proxies)
// The API layer is ready to swap in real endpoints when available.

class ApiService {
    async getPlayers() {
        return window.RLData.PLAYERS || [];
    }

    async getMatches() {
        return window.RLData.MATCHES || [];
    }

    async getTeams() {
        return window.RLData.TEAMS || [];
    }

    async getUpcomingMatches() {
        return window.RLData.UPCOMING || [];
    }
}

window.Api = new ApiService();
