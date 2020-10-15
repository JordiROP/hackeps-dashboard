$(function () {
    if (getCookie("token") == "") {
        $("#login").load("../html/login.html",);
    } else {
        load_page();
    }
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

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
$("#users").load("../html/users.html",userStats);
}