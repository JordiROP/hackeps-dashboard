$(function () {
    var token = getCookie('token');
    var refresh_token = getCookie('refresh_token');
    if (token === "" && refresh_token === "") {
        $("#login").load("../html/login.html",);
    } else if (token === "" && refresh_token !== "") {
        refreshToken(refresh_token).then(function(response) {
            setCookie('token', response.user.idToken, 3600*1000);
            load_page();
          }).catch(function(error) {
            console.log(error);
          });
    } else {
        load_page();
    }
});

function load_page() {
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
  $("#users").load("../html/users.html", userStats);
}

