// True Firebase Authentication and User Data Management

class AuthService {
    constructor() {
        this.user = null;
        this.userData = { favorites: { players: [], teams: [] }, predictions: {} };
        
        // Listen to Firebase Auth state changes
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.user = user;
                await this.loadUserData();
                if (window.app) {
                    window.app.updateAuthUI();
                    window.app.render(); // Re-render to show favorites
                }
            } else {
                this.user = null;
                this.userData = { favorites: { players: [], teams: [] }, predictions: {} };
                if (window.app) window.app.updateAuthUI();
            }
        });
    }

    async login(username) {
        const email = `${username.toLowerCase()}@rlet.local`;
        const password = "rlet-default-password";
        
        try {
            // Try to sign in
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                // User doesn't exist, create it
                try {
                    const userCreds = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    await userCreds.user.updateProfile({
                        displayName: username,
                        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
                    });
                    
                    // Initialize empty document in Firestore
                    await firebase.firestore().collection('users').doc(userCreds.user.uid).set({
                        username: username,
                        favorites: { players: [], teams: [] },
                        predictions: {}
                    });
                } catch (e) {
                    console.error("Error creating user:", e);
                    alert("Erreur lors de la création du compte.");
                }
            } else {
                console.error("Login error:", error);
                alert("Erreur de connexion.");
            }
        }
    }

    async logout() {
        await firebase.auth().signOut();
        if(window.app) window.app.render();
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getUser() {
        if (!this.user) return null;
        return {
            username: this.user.displayName || this.user.email.split('@')[0],
            avatar: this.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.user.email}`,
            favorites: this.userData.favorites,
            predictions: this.userData.predictions
        };
    }

    async loadUserData() {
        if (!this.user) return;
        try {
            const doc = await firebase.firestore().collection('users').doc(this.user.uid).get();
            if (doc.exists) {
                this.userData = doc.data();
                if (!this.userData.favorites) this.userData.favorites = { players: [], teams: [] };
                if (!this.userData.predictions) this.userData.predictions = {};
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    async toggleFavorite(type, id) {
        if (!this.user) return false;
        
        if (!this.userData.favorites[type]) {
            this.userData.favorites[type] = [];
        }
        
        const index = this.userData.favorites[type].indexOf(id);
        if (index > -1) {
            this.userData.favorites[type].splice(index, 1);
        } else {
            this.userData.favorites[type].push(id);
        }

        // Save to Firestore
        try {
            await firebase.firestore().collection('users').doc(this.user.uid).update({
                [`favorites.${type}`]: this.userData.favorites[type]
            });
            return true;
        } catch (e) {
            console.error("Error saving favorite:", e);
            return false;
        }
    }

    isFavorite(type, id) {
        if (!this.user || !this.userData.favorites[type]) return false;
        return this.userData.favorites[type].includes(id);
    }

    async savePrediction(matchId, predictedWinnerLogo, predictedScore1, predictedScore2) {
        if (!this.user) return false;
        
        const prediction = {
            winner: predictedWinnerLogo,
            score1: predictedScore1,
            score2: predictedScore2,
            timestamp: new Date().toISOString()
        };

        this.userData.predictions[matchId] = prediction;

        try {
            await firebase.firestore().collection('users').doc(this.user.uid).set({
                predictions: {
                    [matchId]: prediction
                }
            }, { merge: true });
            return true;
        } catch (e) {
            console.error("Error saving prediction:", e);
            return false;
        }
    }

    getPrediction(matchId) {
        if (!this.user || !this.userData.predictions) return null;
        return this.userData.predictions[matchId] || null;
    }
}

window.Auth = new AuthService();
