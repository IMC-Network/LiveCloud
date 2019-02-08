var currentUser = {
    uid: null
};

function addApp() {
    $("<div class='appTile'>").appendTo($(".appsList"));
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser.uid = user.uid;

        firebase.database().ref("users/" + currentUser.uid + "/version").once("value", function(versionSnapshot) {
            firebase.database().ref("users/" + currentUser.uid + "/versionID").once("value", function(versionIDSnapshot) {
                if (versionSnapshot.val() != null) {
                    if (versionSnapshot.val() != LiveCloud.version) {
                        dialog("LiveCloud has been updated!", `
                            <strong>Welcome to LiveCloud version ` + LiveCloud.version + `!</strong>
                            ` + LiveCloud.changelog + `
                        `);
                    }
                } else {
                    dialog("Welcome to LiveCloud!", `
                        <strong>Welcome to IMC LiveCloud!</strong> We're glad to
                        have you on-board. If you ever need help, just read the
                        documentation or get live support by pressing the Help
                        button in the top bar. We can't wait to see what you
                        create!
                    `);
                }

                firebase.database().ref("users/" + currentUser.uid + "/version").set(LiveCloud.version);
                firebase.database().ref("users/" + currentUser.uid + "/versionID").set(LiveCloud.versionID);
            });
        });
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