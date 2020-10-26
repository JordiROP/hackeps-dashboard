
function userStats() {
    const users_url = 'https://hackeps-dashboard.herokuapp.com/users';
      $.ajax({
          url: users_url,
          type: "GET",
          headers: {'token': getCookie('token')}
        }).done(function(data, status) {
            setUsersTable(data.users);
            setUsersCard(data.users);
          //   setShirtCard(data.users);
            setAllergiesTable(data.users);
        }).fail(function(cause){
          console.log(cause)
        });
}

function setUsersTable(users) {
    users.forEach(user => {
        $("#usersList tbody").append(
            `<tr>
                <th scope=${user.uid}>${user.uid}</th>
                <td>${user.full_name}</td>
                <td>${user.birthday}</td>
                <td>${user.allergies}</td>
                <td>${user.gdpr}</td>
                <td>${user.terms}</td>
                <td id="${user.uid}-accepted-col">${user.status}</td>
                <td><button id="${user.uid}-accept" type="button" class="btn ok-btn" onclick="acceptUser(\'${user.uid}\');">Accept</button></td>
                <td><button id="${user.uid}-deny" type="button" class="btn ko-btn" onclick="denyUser(\'${user.uid}\');">Deny</button></td>
            </tr>`);
            if (user.status === "YES") {
                document.getElementById(user.uid + "-accept").disabled = true;
            } else if (user.status === "NO") {
                document.getElementById(user.uid + "-deny").disabled = true;
            } else {
                document.getElementById(user.uid + "-accept").disabled = false;
                document.getElementById(user.uid + "-deny").disabled = false;
            }
        });
}

function setShirtCard(users) {
    var shirts = new Map();
    var count = 0;
    shirts.set('S', 0);
    shirts.set('M', 0);
    shirts.set('L', 0);
    shirts.set('XL', 0);
    shirts.set('XXL', 0);
    users.forEach(user => {
        shirts.set(user.shirt_size, shirts.get(user.shirt_size)+1);
        count++;
    });
    document.getElementById("shirts-total").innerHTML = count.toString();
    document.getElementById("size-s").innerHTML = "S: " + shirts.get("S").toString();
    document.getElementById("size-m").innerHTML = "M: " + shirts.get("M").toString();
    document.getElementById("size-l").innerHTML = "L: " + shirts.get("L").toString();
    document.getElementById("size-xl").innerHTML = "XL: " + shirts.get("XL").toString();
    document.getElementById("size-xxl").innerHTML = "XXL: " + shirts.get("XXL").toString();
}

function setAllergiesTable(users) {
    var count = 0;
    users.forEach(user => {
        if(user.allergies !== "") {
            $("#allergies-list tbody").append(
                `<tr>
                    <th scope=${count}>${count}</th>
                    <td>${user.allergies}</td>
                </tr>`);
                count++;
            }
        });
    document.getElementById("allergies-total").innerHTML = count.toString();
}

function setGenderCard(users) {
    var genders = new Map();
    var count = 0;
    users.forEach(user => {
        genders.set(user.gender, genders.get(user.gender)+1);
        count++;
    });

    document.getElementById("gender-total").innerHTML = count.toString();
    document.getElementById("gender-m").innerHTML = "Male: " + shirts.get("M").toString();
    document.getElementById("gender-f").innerHTML = "Female: " + shirts.get("F").toString();
    document.getElementById("gender-").innerHTML = "Other: " + shirts.get("O").toString();
}

function setUsersCard(users) {
  var accepted = 0;
  var denied = 0;
  var waiting = 0;
  users.forEach(user => {
    if (user.status === "YES") {
      accepted += 1;
    } else if(user.status === "NO") {
      denied += 1;
    } else {
      waiting += 1;
    }
  });
  var total = accepted + denied + waiting;
  document.getElementById("people-total").innerHTML = total.toString();
  document.getElementById("accepted").innerHTML = '<i class="fas fa-check fa-3x"></i> \t' + accepted.toString();
  document.getElementById("denied").innerHTML = '<i class="fas fa-ban fa-3x"></i> \t' + denied.toString();
  document.getElementById("waiting").innerHTML = '<i class="fas fa-spinner fa-3x"></i> \t' + waiting.toString();
}

function acceptUser(userId) {
    const update_url = 'https://hackeps-dashboard.herokuapp.com/users/update/' + userId
    $.ajax({
        url: update_url,
        type: "POST",
        headers: {'token': getCookie('token')},
        data:{'status': 'YES'}
      }).done(function(data, status) {
        document.getElementById(userId + "-accepted-col").innerHTML = "YES";
        document.getElementById(userId + "-accept").disabled = true
        document.getElementById(userId + "-deny").disabled = false
      }).fail(function(cause){
        console.log(cause)
      });
}

function denyUser(userId) {
    const update_url = 'https://hackeps-dashboard.herokuapp.com/users/update/' + userId
    $.ajax({
        url: update_url,
        type: "POST",
        headers: {'token': getCookie('token')},
        data:{'status': 'NO'}
      }).done(function(data, status) {
        document.getElementById(userId + "-accepted-col").innerHTML = "NO";
        document.getElementById(userId + "-accept").disabled = false
        document.getElementById(userId + "-deny").disabled = true
      }).fail(function(cause){
        console.log(cause)
      });
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