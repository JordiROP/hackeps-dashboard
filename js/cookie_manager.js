function setCookie(name, value, millis) {
    expiration_date = new Date();
    expiration_date.setTime(expiration_date.getTime() + millis);
    expiration_date = millis === null ? "" : 'expires=' + expiration_date.toUTCString();
    document.cookie = name + '=' + value + ';' + expiration_date + "";
}

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