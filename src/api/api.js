function resolveReject(response, resolve, reject) {
    if (response.ok) {
        return response.json().then(resolve);
    } else {
        return response.text().then(reject);
    }
}

function get(url, resolve, reject) {
    fetch(url).then(response=>resolveReject(response, resolve, reject)).catch(console.log);
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
function simplePost(url, resolve, reject){
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
    simplePost("/logout",f=>f, console.warn);
}
function getClient(resolve, reject) {
    get("/client/me", resolve, reject)  ;
}
function createFood(createFoodForm, resolve, reject) {
    post('/food/create', createFoodForm, resolve, reject);
}
function deleteFood(id, resolve, reject) {
    simplePost(`/food/${id}/delete`, resolve, reject);
}
function updateFood(id, updateFoodForm, resolve, reject) {
    post(`/food/${id}/update`, updateFoodForm, resolve, reject);
}
function getFoods(resolve, reject) {
    get('/food/get', resolve, reject);
}
function createPortion(createPortionForm, resolve, reject) {
    post('/portion/create', createPortionForm, resolve, reject);
}
function deletePortion(id, resolve, reject) {
    simplePost(`/portion/${id}/delete`, resolve, reject);
}
function updatePortion(id, updatePortionForm, resolve, reject) {
    post(`/portion/${id}/update`, updatePortionForm, resolve, reject);
}
function getPortions(resolve, reject)  {
    console.warn("Method new in that version of api");
    get('/portion/get', resolve, reject);
}
function getPortionsByFood(foodId, resolve, reject) {
    get(`/portion/get/food/${foodId}`, resolve, reject);
}


//function registrate
export const api = { 
    authenticate, 
    registrate, 
    logout,
    getClient,

    createFood,
    deleteFood,
    updateFood,
    getFoods,

    createPortion,
    deletePortion,
    updatePortion,
    getPortions,
    getPortionsByFood
}