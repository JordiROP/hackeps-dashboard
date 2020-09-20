$(document).on('click', '#logout', function() {
    firebase.auth().signOut().then(function() {
        $("div").remove("#users");
        $("div").remove("#navbar");
        $("div").remove("#sidebars");
        $("div").remove(".container-fluid");
        $("body").append("<div id='login'></div>");
        $("#login").load("../html/login.html",);
      }).catch(function(error) {
        // An error happened.
      });
    
    return false;
});