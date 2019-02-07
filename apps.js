var currentUser = {
    uid: null
};

function addApp() {
    $("<div class='appTile'>").appendTo($(".appsList"));
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser.uid = user.uid;
    } else {
        window.location.href = "index.html";
    }
});

$(function() {
    addApp();
    addApp();
    addApp();
    addApp();
    addApp();
    addApp();
    addApp();
    addApp();
});