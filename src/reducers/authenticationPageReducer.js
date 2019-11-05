import { REGISTRATE, REQUEST_STATUS, HANDLE_AUTHENTICATION_PAGE } from "../actions";

function authenticationPageReducer(
    state={
        client: {
            id: -1,
            isAuthenticated: false,
            isAuthenticating: false,
            isRegistrating: false
        },
        inputs: {
            login: '',
            name: '',
            password: '',
        },
        activePage: 'registrationPage'
    },
    action
) {
    const {type, payload, status, error} = action;
    switch(type) {
        case REGISTRATE: {
            switch(status) {
                case REQUEST_STATUS: {
                    return {
                        ...state,
                        client: {
                            ...state.client,
                            isRegistrating: true
                        }
                    }
                }
            }
        }
        case HANDLE_AUTHENTICATION_PAGE: {
            return payload.handle(state);
        }
    }    
    return state;
}

export default authenticationPageReducer;