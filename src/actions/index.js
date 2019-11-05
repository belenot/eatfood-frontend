export const REQUEST_STATUS = "REQUEST";
export const OK_STATUS = "OK";
export const ERR_STATUS = "ERR";

export const AUTHORIZE = "AUTHORIZE";
export const HANDLE_AUTHENTICATION_PAGE = "HANDLE_AUTHENTICATION_PAGE";
export const REGISTRATE = "REGISTRATE";

export const CREATE_FOOD = "CREATE_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";
export const UPDATE_FOOD = "UPDATE_FOOD";

export const CREATE_PORTION = "CREATE_PORTION";
export const DELETE_PORTION = "DELETE_PORTION";
export const UPDATE_PORTION = "UPDATE_PORTION";

export function registrate(
    client = {
        id: -1,
        login: '',
        password: '',
        name: ''
    }, 
    status = REQUEST_STATUS,
    error = ''
) {
    return ({ type: CREATE_CLIENT, payload: { client }, status, error })
}

export function handleAuthenticationPage(handle=f=>f) {
    return ({
        type: HANDLE_AUTHENTICATION_PAGE,
        payload: {handle}
    })
}
