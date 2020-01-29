$("document").ready(function () {
    isCookie();
    createPage();

    let staySignedIn = false;

    $("#checkBox").click(() => {
        staySignedIn = !staySignedIn;
    });

    $("#submit").mouseup(() => {
        if(fieldsNotEmpty()) {
            $.post({
                type: "POST",
                data: {
                    "userName": $("#userName").val(),
                    "passWord": $("#passWord").val()
                },
                url: "./loginMagic.php",
                dataType: "json",
                error: (data) => {
                    console.log(data.responseText);
                }
            }).done((data) => {
                if (data && staySignedIn) {
                    setCookie(true);
                } else if (data) {
                    setCookie(false);
                } else {
                    alert("Wrong credentials!");
                }
            });
        } else {
            alert("Please fill in the form!");
        }
    });
});

let fieldsNotEmpty = () => {
    return $("#userName").val() !== "" && $("#passWord").val() !== "";
};

let createPage = () => {
    let p1 = $("<p></p>");
    let p2 = $("<p></p>");
    let button = $("<button>");
    let input1 = $("<input>");
    let input2 = $("<input>");
    let checkbox = $("<input>");
    let label = $("<label></label>");
    let body = $("body");

    p1.text("Username:");
    input1.attr("id", "userName")
        .attr("type", "text")
        .attr("name", "userName");
    p2.text("Password:");
    input2.attr("id", "passWord")
        .attr("type", "password")
        .attr("name", "passWord");
    button.attr("id", "submit")
        .attr("type", "button")
        .text("Click me!");
    checkbox.attr("id", "checkBox").attr("value", "logIn").attr("type", "checkbox");
    label.text("Stay logged in");
    body.append(p1,
        input1,
        p2,
        input2,
        "<br>",
        button,
        checkbox,
        label);
};
let setCookie = (bool) => {
    if (bool) {
        let d = new Date();
        d.setTime(d.getTime() + (1000*24*60*60*1000));
        document.cookie = "loggedIN=true; expires=" + d.toUTCString() + "; path=/";
        window.location.href = "./forwarded.html";
    } else {
        document.cookie = "loggedIN=true; path=/";
        window.location.href = "./forwarded.html";
    }
};

let isCookie = () => {
    let cookie = document.cookie;
    if (cookie === "loggedIN=true")
        window.location.href = "./forwarded.html";
};