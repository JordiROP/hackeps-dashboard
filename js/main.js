$(document).ready(function () {
    $("#sidebars").load("../html/sidebar.html",);
    $("#users").load("../html/users.html", userStats);
    $("#teams").load("../html/teams.html", teamStats);
});