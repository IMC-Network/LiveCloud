var LiveCloud = {
    version: "0.1.0",
    versionID: 0,
    changelog: `IMC has been developing this update to bring new features to the table, including:
        <ul>
            <li>More LiveCloud stuff!</li>
        </ul>
    `
};

var loaderRotationAngle = 0;

function dialog(title, content, buttons = [{text: "Close", onclick: "closeDialog();", type: "primary"}], allowEscape = true) {
    $(".dialog").html(`
        <div class="dialogTitle"></div>
        <div class="dialogContent"></div>
        <div class="dialogActions"></div>
    `);

    $(".dialogTitle").text(title);
    $(".dialogContent").html(content);

    for (var i = 0; i < buttons.length; i++) {
        $(".dialogActions").html(
            $(".dialogActions").html() +
            "<button" +
            (
                buttons[i].type == "secondary" ?
                " class='secondary'" :
                (
                    buttons[i].type == "bad" ?
                    " class='bad'" :
                    (
                        buttons[i].type == "reallyBad" ?
                        " class='reallyBad'" :
                        (
                            buttons[i].type == "highlight" ?
                            " class='highlight'" :
                            ""
                        )
                    )
                )
            ) +
            " onclick='" +
            buttons[i].onclick +
            "'>" +
            buttons[i].text +
            "</button>"
        );
    }

    if (allowEscape) {
        $(".dialogBackground").attr("onclick", "closeDialog();");
    } else {
        $(".dialogBackground").attr("onclick", "");
    }

    $(".dialogBackground").fadeIn();
    $(".dialog").fadeIn();
}

function closeDialog() {
    $(".dialogBackground").fadeOut();
    $(".dialog").fadeOut();
}

$(function() {
    setInterval(function() {
        loaderRotationAngle += 90;

        $(".loader").css("transform", "rotate(" + loaderRotationAngle + "deg)");

        if (loaderRotationAngle >= 360) {
            loaderRotationAngle = 0;
        }
    }, 150);
});