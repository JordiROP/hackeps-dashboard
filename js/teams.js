function teamStats() {
    var db = firebase.firestore();
    db.collection("hackeps-2019/prod/teams").get().then(querySnapshot => {
        var teams = querySnapshot.docs.map(doc => doc.data());
        showTeams(teams);
    });
    
}

function showTeams(teams) {
    var count = 0;
    var membersWTeam = 0;
    teams.forEach(team => {
        $("#teamsList tbody").append(
            `<tr>
                <th scope=${count}>${count}</th>
                <td>${team.name}</td>
                <td>${team.members.length}/4</td>
            </tr>`);
        count++;
        membersWTeam += team.members.length;
    });

    $("#teamsMiscList tbody").append(
        `<tr>
            <th scope=${count}>${count}</th>
            <td>Teams</td>
            <td>${count}</td>
        </tr>`);
    $("#teamsMiscList tbody").append(
        `<tr>
            <th scope=${count}>${count}</th>
            <td>Members w/ Team</td>
            <td>${membersWTeam}</td>
        </tr>`);
}