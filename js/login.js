$(document).on('click', '#logginButton',function() {
    // HOLA CODE REVIWERS QUE TAL COMO VA TODOOOOO!
    // NO HAGAIS MUCHO CASO POR AQUI QUE ESTO ES UNA MIERDA
    // MIMITOS Y BESIS PA TODOS <3
    const login_url = 'https://hackeps-dashboard.herokuapp.com/login';
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    $.ajax({
      url: login_url,
      type: "POST",
      data:{'email': email, 'password': password}
    }).done(function(data, status) {
      expiration_date = new Date();
      expiration_date.setTime(expiration_date.getTime() + ((2*3600 + 3420)*1000));
      expiration_date = 'expires=' + expiration_date.toUTCString().replace('GMT', 'UTC');
      document.cookie = "token=" + data.token + ';' + expiration_date + "";
      document.cookie = "refresh_token="+ data.refresh_token;
      load_page();
    }).fail(function(cause){
      console.log(cause)
    });
    return false;
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
