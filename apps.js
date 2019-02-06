var currentUser = {
    uid: null
};

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser.uid = user.uid;
    } else {
        window.location.href = "index.html";
    }
});