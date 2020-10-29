const login_url = 'https://hackeps-dashboard.herokuapp.com/login';
const refresh_url = 'https://hackeps-dashboard.herokuapp.com/refresh_token';

async function login(email, password) {
    return await $.ajax({
                    url: login_url,
                    type: "POST",
                    data:{'email': email, 'password': password}
                });
}

async function refreshToken(refresh_token) {
    return await $.ajax({
                    url: refresh_url,
                    type: "POST",
                    data: {'refresh_token': refresh_token}
                });  
}