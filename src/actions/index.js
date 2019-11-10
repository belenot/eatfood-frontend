import { func } from "prop-types";

export const REQUEST_STATUS = "REQUEST";
export const OK_STATUS = "OK";
export const ERR_STATUS = "ERR";

export const AUTHENTICATE = "AUTHENTICATE";
export const REGISTRATE = "REGISTRATE";

export const HANDLE_AUTHENTICATION_PAGE = "HANDLE_AUTHENTICATION_PAGE";
export const HANDLE_MAIN_PAGE = "HANDLE_MAIN_PAGE";

export const ADD_FOOD = "ADD_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";
export const UPDATE_FOOD = "UPDATE_FOOD";
export const GET_FOODS = "GET_FOODS";

export const ADD_PORTION = "ADD_PORTION";
export const DELETE_PORTION = "DELETE_PORTION";
export const UPDATE_PORTION = "UPDATE_PORTION";

export function registrate(
    client = {
        id: -1,
        username: '',
        password: ''
    }, 
    status = REQUEST_STATUS,
    error = ''
) {
    return ({ type: REGISTRATE, payload: { client }, status, error })
}

export function authenticate(
    client = {
        username: '',
        password: ''
    },
    status = REQUEST_STATUS,
    error = ''
) {
    return ({
        type: AUTHENTICATE,
        payload: { client },
        status,
        error
    })
}

export function handleAuthenticationPage(handle=f=>f) {
    return ({
        type: HANDLE_AUTHENTICATION_PAGE,
        payload: {handle}
    })
}

export function handleMainPage(handle=f=>f) {
    return ({
        type: HANDLE_MAIN_PAGE,
        payload: {handle}
    })
}

export function getFoods(foods=[], status, error) {
    return {
        type: GET_FOODS,
        payload: {
            foods
        },
        status,
        error
    }
}

export function addFood(food, status, error) {
    return {
        type: ADD_FOOD,
        payload: {
            food
        },
        status,
        error
    }
}