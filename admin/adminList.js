events.userReady.push(function() {
    firebase.database().ref("orgs/" + currentUser.orgName + "/members").on("value", function(snapshot) {
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

        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().admin == true) {
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

                $(".adminList table > tbody [data-col='name']:last").text(childSnapshot.val().name);
                $(".adminList table > tbody [data-col='email']:last").text(childSnapshot.val().email);
                $(".adminList table > tbody [data-col='position']:last").text(childSnapshot.val().position);
            }
        })
    });
});