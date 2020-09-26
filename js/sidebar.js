$(document).on('click', '#usersLink',function() {
    $("div").remove("#teams");
    $("#main").append("<div id='users'></div>");
    $("#users").load("../html/users.html",userStats);
    return false;
});

$(document).on('click', '#teamsLink', function() {
    $("div").remove("#users");
    $("#main").append("<div id='teams'></div>");
    $("#teams").load("../html/teams.html", teamStats);
    return false;
});