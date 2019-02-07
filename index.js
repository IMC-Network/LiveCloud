function signIn() {
    $(".signInButton").attr("disabled", "");
    $(".signInButton").text("Signing In...");

    firebase.auth().signInWithEmailAndPassword($("#email").val(), $("#password").val()).catch(function(error) {
        $("#signInError").text(error.message);

        $(".signInButton").removeAttr("disabled");
        $(".signInButton").text("Sign In");
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