const firebaseConfig = {
    apiKey: "AIzaSyD-X_Zknm7KK1e4VB26-oMj53-mrdayQxQ",
    authDomain: "rlet-b1e8f.firebaseapp.com",
    projectId: "rlet-b1e8f",
    storageBucket: "rlet-b1e8f.firebasestorage.app",
    messagingSenderId: "604309188994",
    appId: "1:604309188994:web:25dc6ab9ddf6e9ab091f9b",
    measurementId: "G-JRLW8FRRRR"
};

// Initialize Firebase using compat libraries
firebase.initializeApp(firebaseConfig);

window.auth = firebase.auth();
window.db = firebase.firestore();
