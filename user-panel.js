auth.onAuthStateChanged(user => {
    if (user) {
        db.collection("users").doc(user.uid).get().then(doc => {
            const role = doc.data().role;
            if (role === "user" || role === "admin") {
                console.log("Welcome User!");
            } else {
                alert("Access Denied!");
                window.location.href = "control-panel.html";
            }
        });
    } else {
        window.location.href = "index.html";
    }
});
