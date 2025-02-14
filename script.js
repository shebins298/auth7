// Firebase Authentication and Firestore References
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("google-login").addEventListener("click", () => {
    const loginButton = document.getElementById("google-login");

    // Hide the login button and show a loading message
    loginButton.style.display = "none";
    const loadingMessage = document.createElement("p");
    loadingMessage.textContent = "Logging in...";
    document.querySelector(".login-container").appendChild(loadingMessage);

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            const uid = user.uid;
            const userEmail = user.email;

            console.log("User logged in:", userEmail);

            // Check if the user exists in Firestore
            return db.collection("users").doc(uid).get();
        })
        .then(doc => {
            if (!doc.exists) {
                // First-time login: Assign "pending" role
                return db.collection("users").doc(auth.currentUser.uid).set({
                    email: auth.currentUser.email,
                    role: "pending"
                }).then(() => {
                    alert("Access Denied! Contact Admin to get a role.");
                    auth.signOut().then(() => {
                        window.location.href = "index.html";
                    });
                });
            } else {
                // If the user exists, check role and redirect
                const userData = doc.data();
                console.log("User role:", userData.role);
                
                if (userData.role === "pending") {
                    alert("Access Denied! Contact Admin to get a role.");
                    auth.signOut().then(() => {
                        window.location.href = "index.html";
                    });
                } else {
                    // Redirect to control panel
                    window.location.href = "control-panel.html";
                }
            }
        })
        .catch(error => {
            console.error("Login Error:", error);
            loginButton.style.display = "block"; // Show button if login fails
            loadingMessage.remove();
        });
});

// Persist login state and auto-redirect if logged in
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists && doc.data().role !== "pending") {
                window.location.href = "control-panel.html";
            }
        });
    }
});
