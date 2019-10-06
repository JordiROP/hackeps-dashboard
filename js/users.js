
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
    shirts.set('S', 0);
    shirts.set('M', 0);
    shirts.set('L', 0);
    shirts.set('XL', 0);
    shirts.set('XXL', 0);
    users.forEach(user => {
        shirts.set(user.shirtSize, shirts.get(user.shirtSize)+1);
    });
    shirts.forEach()
}

function acceptedUserStatus(users) {
    var acceptedUsers = [];
    var pendentUsers = [];
    var deniedUsers = [];

    users.forEach(user => {
        if(user.accepted === "PENDENT") {
            pendentUsers.push({"name" : user.fullName, "status": "PENDENT"})
        } else if (user.accepted === "ACCEPTED") {
            acceptedUsers.push({"name" : user.fullName, "status": "ACCEPTED"})
        } else {
            deniedUsers.push({"name" : user.fullName, "status": "DENIED"})
        }
    });
}

function gdprStatus(users) {
    gdprForUser = [];

    users.forEach(user => {
        gdprForUser.push({"name" : user.fullName, "gdpr" : user.gdpr});
    });
}

function getAlergies(users) {
    alergies = [];
    users.forEach(user => {
        if(user.food) { alergies.push(user.food) }
    });
    console.log(alergies);
}

userStats();