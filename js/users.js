function userStats() {
    var db = firebase.firestore();
    db.collection("hackeps-2019/dev/users").get().then(querySnapshot => {
        var users = querySnapshot.docs.map(doc => doc.data());
        setUsersTable(users);
        setShirtCard(users);
        setAllergiesTable(users);
    });
}

function setUsersTable(users) {
    users.forEach(user => {
        $("#usersList tbody").append(
            `<tr>
                <th scope=${user.uid}>${user.uid}</th>
                <td>${user.fullName}</td>
                <td>${user.birthDate}</td>
                <td>${user.food}</td>
                <td>${user.shirtSize}</td>
                <td>${user.gdpr}</td>
                <td>${user.terms}</td>
                <td id="${user.uid}-accepted-col">${user.accepted}</td>
                <td><button id="${user.uid}-accept" type="button" class="btn ok-btn" onclick="acceptUser(\'${user.uid}\');">Accept</button></td>
                <td><button id="${user.uid}-deny" type="button" class="btn ko-btn" onclick="denyUser(\'${user.uid}\');">Deny</button></td>
            </tr>`);
            if (user.accepted === "YES") {
                document.getElementById(user.uid + "-accept").disabled = true;
            } else {
                document.getElementById(user.uid + "-deny").disabled = true;
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
        shirts.set(user.shirtSize, shirts.get(user.shirtSize)+1);
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
        console.log(user.food);
        if(user.food !== "") {
            console.log(user.food);
            $("#allergies-list tbody").append(
                `<tr>
                    <th scope=${count}>${count}</th>
                    <td>${user.food}</td>
                </tr>`);
            }
            count++;
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

function acceptUser(userId) {
    db.collection("hackeps-2019/dev/users").doc(userId).update({
        "accepted": "YES"
    });
    document.getElementById(userId + "-accepted-col").innerHTML = "YES";
    document.getElementById(userId + "-accept").disabled = true
    document.getElementById(userId + "-deny").disabled = false
    console.log(userId);
}

function denyUser(userId) {
    db.collection("hackeps-2019/dev/users").doc(userId).update({
        "accepted": "NO"
    });
    document.getElementById(userId + "-accepted-col").innerHTML = "NO";
    document.getElementById(userId + "-accept").disabled = false
    document.getElementById(userId + "-deny").disabled = true
}

