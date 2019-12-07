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
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th width="120">Options</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                `).appendTo(".adminList");

                // TODO: Add working admin listing

                $(`
                    <tr>
                        <td data-col="name" class="tableColumnNoWrap"></td>
                        <td data-col="email"></td>
                        <td data-col="position"></td>
                        <td data-col="options" class="tableColumnNoWrap">
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                `).appendTo(".adminList table > tbody");
            
                $(".adminList table > tbody [data-col='name']:last").text("James Livesey");
                $(".adminList table > tbody [data-col='email']:last").text("james@imcnetwork.cf");
                $(".adminList table > tbody [data-col='position']:last").text("Owner");
            });
        });
    } else {
        window.location.href = "index.html";
    }
});