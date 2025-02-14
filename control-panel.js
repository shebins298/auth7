document.addEventListener("DOMContentLoaded", () => {
    // ✅ Ensure Firebase is available
    if (typeof firebase === "undefined") {
        console.error("❌ Firebase not found in control-panel.js!");
        return;
    }

    console.log("✅ Firebase SDK confirmed in control-panel.js");

    // ✅ Ensure auth and db are available
    if (!window.auth || !window.db) {
        console.error("❌ Firebase services (auth, db) not initialized!");
        return;
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            const uid = user.uid;
            
            db.collection("users").doc(uid).get().then(doc => {
                if (doc.exists) {
                    const role = doc.data().role;

                    const userPanelBtn = document.getElementById("user-panel-btn");
                    const adminPanelBtn = document.getElementById("admin-panel-btn");

                    if (userPanelBtn) userPanelBtn.style.display = "block";
                    if (adminPanelBtn && role === "admin") adminPanelBtn.style.display = "block";
                } else {
                    alert("Unauthorized Access!");
                    auth.signOut();
                    window.location.href = "index.html";
                }
            }).catch(error => {
                console.error("❌ Firestore Error:", error);
            });
        } else {
            window.location.href = "index.html";
        }
    });

    // ✅ Logout
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            auth.signOut().then(() => {
                window.location.href = "index.html";
            });
        });
    } else {
        console.error("❌ Logout button not found!");
    }
});
