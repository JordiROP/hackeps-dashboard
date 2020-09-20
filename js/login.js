$(document).on('click', '#logginButton',function() {
    console.log("HOLLA");
    var email = "jordirop@hotmail.com";
    var password = "Marruecos1234.";
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    return false;
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("div").remove("#login")
      $("body").append("<div id='navbar'></div>");
      $("#navbar").load("../html/navbar.html",);
      $("body").append('<div class="container-fluid">'+
      '<div class="row">' +
          '<div id="sidebars"></div>' +
          '<div class="col-10 offset-2" id="main">' +
              '<div id="users"></div>' +
          '</div>' +
      '</div>' +
  '</div>');
      $("#sidebars").load("../html/sidebar.html",);
      $("#users").load("../html/users.html",userStats);
    } else {
      // User is signed out.
      // ...
    }
  });