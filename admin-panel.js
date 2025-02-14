auth.onAuthStateChanged(user => {
    if (user) {
        db.collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists && doc.data().role === "admin") {
                console.log("Welcome Admin!");
            } else {
                alert("Access Denied!");
                window.location.href = "control-panel.html";
            }
        });
    } else {
        window.location.href = "index.html";
    }
});
