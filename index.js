function signIn() {
    firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {
        $("#signInError").text(error.message);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = "apps.html";
    }
});

$(function() {
    $("#password").keydown(function(e) {
        if (e.keyCode == 13) {
            signIn();
        }
    });
});