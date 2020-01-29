$("document").ready(function () {
    hasCookie();
    createPage();

    $("#logout").mouseup(() => {
        document.cookie = "loggedIN=true; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        window.location.href = "./index.html";
        alert("You haven been signed out!");
    });
});

let hasCookie = () => {
    let cookie = document.cookie;
    if (cookie !== "loggedIN=true")
        window.location.href = "./index.html";
};

let createPage = () => {
    let p = $("<p></p>");
    let button = $("<button></button>");

    p.text("Welcome!");
    button.attr("id", "logout")
        .attr("type", "button")
        .text("Logout");
    $("body").append(p, button);
};