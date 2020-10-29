const teams_url = 'https://hackeps-dashboard.herokuapp.com/teams';

function teamStats() {
    var token = getCookie('token');
    var refresh_token = getCookie('refresh_token');
    if (token === "" && refresh_token !== "") {
        refreshToken(refresh_token).then(function(response) {
            setCookie('token', response.user.idToken, 3600*1000);
            teamsRequest(response.user.idToken);
        }).catch(function(error) {
            console.log(error);
        });
    } else if (token === "" && refresh_token === "") {
        toLogin();
    } else {
        teamsRequest(token);
    }
}

function setTotalTeams(teams) {
    var completed = 0;
    var non_completed = 0;
    for (const team of teams) {
        if(team.members.length === 4) {
            completed++;
        } else {
            non_completed++;
        } 
    }
    document.getElementById("teams-total").innerHTML = "Total: " + (completed+non_completed).toString();
    document.getElementById("complete-teams").innerHTML = "Completed: " + completed.toString();
    document.getElementById("non-complete-teams").innerHTML = "Non-Completed: " + non_completed.toString();
}

async function setDetailTeams(teams) {
    var teamsCount = 0;
    var team_row = "";
    team_row = team_row.concat(`<div class="row mt-3">`);
    for(const team of teams) {
        count = 0;
        var row="";
        if(teamsCount%3 === 0 && teamsCount !== 0) {
            team_row = team_row.concat(`</div>`);
            team_row = team_row.concat(`<div class="row mt-3">`);
        }
        for(const member of team.members) {
            console.log(member);
            if(member !== undefined) {

                var photo = member.photo_url === null ? "assets/no-user.png": member.photo_url;
                var name = member.full_name.length <= 20 ? member.full_name : member.full_name.substring(0,17) + '...';
                
                var col = `<div class="col-6">
                    <div class="row justify-content-center">
                        <img src="${photo}" alt="${name}" class="rounded-circle" style="max-height:7rem!important; max-width:7rem!important;">
                    </div>
                    <div class="row justify-content-center">
                        <p>${name}</p>
                    </div>
                </div>`

                if (count === 0  || count === 2 ) {
                    row = row.concat(`<div class="row justify-content-center">`);
                    row = row.concat(col);
                    if(count === team.members.length-1) {
                        row = row.concat(`</div>`);
                    }
                } else if(count === 1 || count === 3) {
                    row = row.concat(col);
                    row = row.concat(`</div>`);
                };
                count++;
            }else {
                if(count === team.members.length-1) {
                    row = row.concat(`</div>`);
                }
                count++;
            }
        }
        team_row = team_row.concat(
            `<div class="col-4">
                <div class="card card-box">
                    <div class="card-body" style="padding-bottom: 0">
                        <div class="row justify-content-center">
                            <p>${team.name}</p>
                        </div>
                    </div>
                    ${row}
                </div>
            </div>`
        );
        if(teamsCount === teams.length-1){
            row = row.concat(`</div>`);
        }
        teamsCount++;        
    }
    $("#teams-screen").append(team_row);
}

async function showTeams(teams) {
    var count = 0;
    var membersWTeam = 0;
    for (const team of teams) {
        $("#teamsList tbody").append(
            `<tr>
                <th scope=${count}>${count}</th>
                <td>${team.name}</td>
                <td>${team.members.map(m => m.full_name).join(", ")}</td>
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

function teamsRequest(token) {
    $.ajax({
        url: teams_url,
        type: "GET",
        headers: {'token': token}
    }).done(function(data, status) {
        setTotalTeams(data.teams);
        setDetailTeams(data.teams);
    }).fail(function(cause){
        console.log(cause)
    });
}

function toLogin() {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "refresh_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    $("div").remove("#navbar");
    $("div").remove("#sidebars");
    $("div").remove(".container-fluid");
    $("body").append("<div id='login'></div>");
    $("#login").load("../html/login.html",);
}