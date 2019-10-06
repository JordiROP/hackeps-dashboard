$(document).ready(userStats());

function userStats() {
    var db = firebase.firestore();
    db.collection("hackeps-2019/prod/users").get().then(querySnapshot => {
        var users = querySnapshot.docs.map(doc => doc.data());
        countShirts(users);
        acceptedUserStatus(users);
        gdprStatus(users);
        getAlergies(users);
    });
}

function countShirts(users) {
    var shirts = new Map();
    var count = 0;
    shirts.set('S', 0);
    shirts.set('M', 0);
    shirts.set('L', 0);
    shirts.set('XL', 0);
    shirts.set('XXL', 0);
    users.forEach(user => {
        shirts.set(user.shirtSize, shirts.get(user.shirtSize)+1);
    });

    shirts.forEach(function(value, key) {
        $("#shirtsList tbody").append(
            `<tr>
                <th scope=${count}>1</th>
                <td>${key}</td>
                <td>${value}</td>
            </tr>`);
    });
}

function acceptedUserStatus(users) {
    var acceptedUsers = [];
    var pendentUsers = [];
    var deniedUsers = [];
    var countAccepted = 0;
    var countPendent = 0;
    var countDenied = 0;
    users.forEach(user => {
        if(user.accepted === "PENDENT") {
            $("#pendentList tbody").append(
                `<tr>
                    <th scope=${countPendent}>1</th>
                    <td>${user.fullName}</td>
                    <td>${user.accepted}</td>
                </tr>`);
                countPendent++;
            //pendentUsers.push({"name" : user.fullName, "status": "PENDENT"})
        } else if (user.accepted === "ACCEPTED") {
            $("#acceptedList tbody").append(
                `<tr>
                    <th scope=${countAccepted}>1</th>
                    <td>${user.fullName}</td>
                    <td>${user.accepted}</td>
                </tr>`);
            countAccepted++;
            //acceptedUsers.push({"name" : user.fullName, "status": "ACCEPTED"})
        } else {
            $("#declinedList tbody").append(
                `<tr>
                    <th scope=${countDenied}>1</th>
                    <td>${user.fullName}</td>
                    <td>${user.accepted}</td>
                </tr>`);
            countDenied++;
            //deniedUsers.push({"name" : user.fullName, "status": "DENIED"})
        }
    });
}

function gdprStatus(users) {
    gdprForUser = [];
    var count=0;
    users.forEach(user => {
        $("#gdprList tbody").append(
            `<tr>
                <th scope=${count}>1</th>
                <td>${user.fullName}</td>
                <td>${user.gdpr}</td>
            </tr>`);
        count++;
    });
}

function getAlergies(users) {
    var count=0;
    users.forEach(user => {
        if(user.food) {
            $("#alergiesList tbody").append(
                `<tr>
                    <th scope=${count}>1</th>
                    <td>${user.food}</td>
                </tr>`);
            count++;
        }
    });
}
