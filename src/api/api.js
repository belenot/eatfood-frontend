function resolveReject(response, resolve, reject) {
    if (response.ok) {
        return response.json().then(resolve);
    } else {
        return response.text().then(reject);
    }
}

function post(url,body,resolve,reject){
    fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response=>resolveReject(response, resolve, reject)).catch(console.log);
}
function simplPost(url, resolve, reject){
    fetch(url, {
        method: "POST", 
    }).then(response=>resolveReject(response, resolve, reject)).catch(console.log);
}

function authenticate(signInForm, resolve, reject) {
    post('/client/signin', signInForm, resolve, reject);
}
function registrate(signUpForm, resolve, reject) {
    post('/client/signup', signUpForm, resolve, reject);
}
function logout() {
    simplPost("/logout",f=>f, console.warn);
}


//function registrate
export const api = { authenticate, registrate, logout }