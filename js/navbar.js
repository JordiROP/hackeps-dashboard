$(document).on('click', '#logout', function() {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "refresh_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
  $("div").remove("#users");
  $("div").remove("#navbar");
  $("div").remove("#sidebars");
  $("div").remove(".container-fluid");
  $("body").append("<div id='login'></div>");
  $("#login").load("../html/login.html",);    
  return false;
});