var currentUser = {
    uid: null
};

function addApp(app) {
    $("<div class='appTile'>")
        .css({
            "background-image": app.thumbnail == null ? "url('media/Blank%20App.png')" : "url('" + encodeURI(app.thumbnail) + "')",
            "background-repeat": "no-repeat",
            "background-position": "center center",
            "background-size": "cover"
        })
        .appendTo(
            $("<a>")
                .attr({
                    "title": app.name,
                    "href": app.location,
                    "target": "_blank"
                })
                .appendTo($(".appsList"))
        )
    ;
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

        firebase.database().ref("users/" + currentUser.uid + "/apps").on("value", function(snapshot) {
            $(".appsList").html("");
    
            if (snapshot.val() == null || snapshot.val().length == 0) {
                firebase.database().ref("users/" + currentUser.uid + "/apps").set([
                    "-LY80gNP7gjB8hQrhNJZ"  // LiveCloud
                ]);
            } else {
                for (var i = 0; i < snapshot.val().length; i++) {
                    firebase.database().ref("apps/" + snapshot.val()[i]).once("value", function(appSnapshot) {
                        if (appSnapshot.val() != null) {
                            addApp(appSnapshot.val());
                        }
                    });
                }
            }
        });
    } else {
        window.location.href = "index.html";
    }
});