var currentUser = {
    uid: null,
    orgName: null,
    org: null,
    orgMember: null
};

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser.uid = user.uid;

        firebase.database().ref("users/" + currentUser.uid + "/org").once("value", function(orgNameSnapshot) {
            currentUser.orgName = orgNameSnapshot.val();

            firebase.database().ref("orgs/" + currentUser.orgName).once("value", function(orgSnapshot) {
                currentUser.org = orgSnapshot.val();
                currentUser.orgMember = orgSnapshot.val().members[currentUser.uid];

                $(".adminList").html("");

                $(`
                    <div class="tableHolder">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Options</th>
                            </tr>
                        </table>
                    </div>
                `).appendTo(".adminList");

                $(`
                    <tr>
                        <td data-col="name" class="tableColumnName"></td>
                        <td data-col="email"></td>
                        <td data-col="position"></td>
                        <td data-col="options" class="tableColumnButtons">
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                `).appendTo(".tableHolder > table");
            
                $("[data-col='name']:last").text("James Livesey");
                $("[data-col='email']:last").text("james@imcnetwork.cf");
                $("[data-col='position']:last").text("Owner");
            });
        });
    } else {
        window.location.href = "index.html";
    }
});