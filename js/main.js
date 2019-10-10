$(document).ready(function () {
    $("#users").load("../html/users.html", userStats);
    $("#teams").load("../html/teams.html", teamStats);
});