import { REGISTRATE, REQUEST_STATUS, HANDLE_AUTHENTICATION_PAGE, OK_STATUS, AUTHENTICATE, ERR_STATUS } from "../actions";

function authenticationPageReducer(
    state={
        client: {
            id: -1,
            isAuthenticated: false,
            isAuthenticating: false,
            isRegistrating: false
        },
        inputs: {
            username: '',
            password: '',
        },
        activePage: 'registrationPage',
        authenticationError: '',
        registrationError: ''
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
                case OK_STATUS: {
                    return {
                        ...state,
                        client: {
                            id: payload.client.id,
                            isAuthenticated: true,
                            isRegistrating: false
                        }
                    }
                }
                case ERR_STATUS: {
                    return {
                        ...state,
                        client: {
                            ...state.client,
                            isRegistrating: false
                        },
                        registrationError: error
                    }
                }
            }
        }
        case AUTHENTICATE: {
            switch(status) {
                case REQUEST_STATUS: {
                    return {
                        ...state,
                        client: {
                            ...state.client,
                            isAuthenticating: true
                        }
                    }
                }
                case OK_STATUS: {
                    return {
                        ...state,
                        client: {
                            ...state.client,
                            isAuthenticated: true,
                            isAuthenticating: false
                        }
                    }
                }
                case ERR_STATUS: {
                    return {
                        ...state,
                        client: {
                            ...state.client,
                            isAuthenticating: false
                        },
                        authenticationError: error
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