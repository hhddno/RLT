// Data fetching layer (Simulating REST API calls)

class ApiService {
    async getPlayers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(window.RLData.PLAYERS || []);
            }, 300); // simulate network latency
        });
    }

    async getMatches() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(window.RLData.MATCHES || []);
            }, 300);
        });
    }

    async getTeams() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(window.RLData.TEAMS || []);
            }, 300);
        });
    }
}

window.Api = new ApiService();
