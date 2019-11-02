import { NOT_FOUND_IMG } from "./constants"


export const initState = {
    client: {
        login: '',
        name: '',
        authenticated: false
    },
    authenticationPage: {
        authentication: {
            login: '',
            password: '',
        },
        registration: {
            login: '',
            password: '',
            name: ''
        },
        page: 'authentication'
    },
    portionsPanel: {
        page: 0,
        rowCount: 10,
        filter: {},
        editedPortion: {
            edited: false,
            id: 0,
            gram: 0,
            date: null,
            foodId: 0
        },
        viewedPortion: {
            show: false
        },
        old: null
    },
    foods: [],
    portions: [],
    viewedFood: {
        show: false,
        img: NOT_FOUND_IMG,
        food: null
    },
    viewedPortion: {
        show: false,
        img: NOT_FOUND_IMG,
        portion: null
    },
    chart: {
        interval: {
            begin: '',
            end: ''
        }
    }
}

export const nutTemplates = { 
    common: {
        kcal: 2000,
        prot: 50,
        carb: 310,
        fat: 70
    }

}

export const testState = {
    client: {
        login: 'belenot',
        name: 'Serg',
        authenticated: true
    },
    authenticationPage: {
        authentication: {
            login: '',
            password: '',
        },
        registration: {
            login: '',
            password: '',
            name: ''
        },
        page: 'authentication',
        error: ''
    },
    foods: [
        {value: { id: 1, name: "food1", kcal: 300, prot: 10, carb: 40, fat: 10 }},
        {value: { id: 2, name: "food2", kcal: 302, prot: 12, carb: 42, fat: 12 }},
        {value: { id: 3, name: "food3", kcal: 303, prot: 13, carb: 43, fat: 13 }},
        {value: { id: 4, name: "food4", kcal: 304, prot: 14, carb: 44, fat: 14 }},
        {value: { id: 5, name: "food5", kcal: 305, prot: 15, carb: 45, fat: 15 }},
        {value: { id: 6, name: "food6", kcal: 306, prot: 16, carb: 46, fat: 16 }},
        {value: { id: 7, name: "food7", kcal: 307, prot: 17, carb: 47, fat: 17 }},
        {value: { id: 8, name: "food8", kcal: 308, prot: 18, carb: 48, fat: 18 }},
        {value: { id: 9, name: "food9", kcal: 309, prot: 19, carb: 49, fat: 19 }},
        {value: { id: 10, name: "food10", kcal: 310, prot: 20, carb: 50, fat: 20 }}
    ],
    portions: [
        {value: { id: 1, gram: 101, date: '2019-11-01', foodId: 2 }},
        {value: { id: 2, gram: 102, date: '2019-11-01', foodId: 3 }}
    ],
    viewedFood: {
        show: false,
        img: NOT_FOUND_IMG,
        food: null
    },
    viewedPortion: {
        show: false,
        img: NOT_FOUND_IMG,
        portion: null
    },
    chart: {
        interval: null
    }
}