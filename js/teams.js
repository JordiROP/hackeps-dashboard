async function getTeamUsers(team) {
    var db = firebase.firestore();
    const usersPromises = team.members.map(u => db.doc('hackeps-2019/prod/' + u.path).get());
    const users = await Promise.all(usersPromises);

    return users.map(u => u.data());
}

async function teamStats() {
    var db = firebase.firestore();
    const teamsSnapshot = await db.collection("hackeps-2019/prod/teams").get();
    const teams = teamsSnapshot.docs.map(doc => doc.data());
    showTeams(teams);
}

async function showTeams(teams) {
    var count = 0;
    var membersWTeam = 0;
    for (const team of teams) {
        const members = await getTeamUsers(team);
        $("#teamsList tbody").append(
            `<tr>
                <th scope=${count}>${count}</th>
                <td>${team.name}</td>
                <td>${members.map(m => m.nickname).join(", ")}</td>
                <td>${team.members.length}/4</td>
            </tr>`);
        count++;
        membersWTeam += team.members.length;
    }

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