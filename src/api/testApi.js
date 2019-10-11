const mockDB = {
    id: {
        clients: 3,
        foods: 11,
        portions: 1
    },
    clients: [
        { id: 1, login: 'belenot', password: 'pass', name: 'Serg' },
        { id: 2, login: 'lol', password: 'pass', name: 'LolKek' }
    ],
    foods: [
        { id: 1, name: "food1", kcal: 300, prot: 10, carb: 40, fat: 10, _client:1 },
        { id: 2, name: "food2", kcal: 302, prot: 12, carb: 42, fat: 12, _client:1 },
        { id: 3, name: "food3", kcal: 303, prot: 13, carb: 43, fat: 13, _client:2 },
        { id: 4, name: "food4", kcal: 304, prot: 14, carb: 44, fat: 14, _client:1 },
        { id: 5, name: "food5", kcal: 305, prot: 15, carb: 45, fat: 15, _client:2 },
        { id: 6, name: "food6", kcal: 306, prot: 16, carb: 46, fat: 16, _client:4 },
        { id: 7, name: "food7", kcal: 307, prot: 17, carb: 47, fat: 17, _client:1 },
        { id: 8, name: "food8", kcal: 308, prot: 18, carb: 48, fat: 18, _client:2 },
        { id: 9, name: "food9", kcal: 309, prot: 19, carb: 49, fat: 19, _client:1 },
        { id: 10, name: "food10", kcal: 310, prot: 20, carb: 50, fat: 20, _client:2 }
    ]
}

function newClientModel(client) {
    return {
        id: client.id,
        login: client.login,
        name: client.name
    }
}

function ServerMock(db)  {
    return {
        registrate: function(signUpForm) {
            if (db.clients.find(client=>client.login==signUpForm.login)) {
                throw new Error("Such login has been already occuped");
            }
            var client = {id: db.id.clients, ...signUpForm};
            db.clients.push(client);
            db.id.clients++;
            return newClientModel(client);
        },
        authenticate: function(signInForm) {
            const {login, password} = signInForm
            var client = db.clients.find(client=>client.login==login&&client.password==password);
            if (!client) {
                throw new Error("no such client");
            }
            return newClientModel(client);
        }
    }
}

var server = ServerMock(mockDB);
function authenticate(signInForm, resolve, reject) {
    try {
        resolve(server.authenticate(signInForm));
    } catch(e) {
        reject(e);
    }
}
function registrate(signUpForm, resolve, reject) {
    try {
        resolve(server.registrate(signUpForm));
    } catch (e) {
        reject(e);
    }
}


export const testApi = {
    authenticate,
    registrate
}