$(document).on('click', '#logginButton',function() {
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    login(email, password).then(function(response){
      setCookie('token', response.token, 3600*1000);
      setCookie('refresh_token', response.refresh_token, null);
      load_page();
    }).catch(function(error){
      console.log(error);
    })
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
  $("#users").load("../html/users.html",userStats);
}