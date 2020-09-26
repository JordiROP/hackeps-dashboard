
$(document).on('click', '#logginButton',function() {

    // HOLA CODE REVIWERS QUE TAL COMO VA TODOOOOO!
    // NO HAGAIS MUCHO CASO POR AQUI QUE ESTO ES UNA MIERDA
    // MIMITOS Y BESIS PA TODOS <3
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {});
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