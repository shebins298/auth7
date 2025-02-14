// Ensure Firebase SDK is loaded
if (typeof firebase === "undefined") {
    console.error("❌ Firebase SDK not loaded. Check script order in index.html!");
} else {
    console.log("✅ Firebase SDK loaded!");

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBjRuZYFEub2V0Wuq3pCIkxb0VcLB-iQO4",
        authDomain: "auth2-29838.firebaseapp.com",
        projectId: "auth2-29838",
        storageBucket: "auth2-29838.appspot.com",
        messagingSenderId: "29566239372",
        appId: "1:29566239372:web:cbfb708f58fc64a94ff1a9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Firebase services
    window.auth = firebase.auth();  // ✅ Store globally
    window.db = firebase.firestore(); // ✅ Store globally

    console.log("✅ Firebase initialized successfully!");
}
