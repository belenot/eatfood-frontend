import { REGISTRATE, OK_STATUS, AUTHENTICATE } from "../actions";

function domainReducer(
    state={
        client: {
            id: -1,
            username: ''
        },
        foods: [],
        portions: []
    },
    action
) {
    const {type, payload, status, error} = action;
    switch(type) {
        case REGISTRATE: {
            switch(status) {
                case OK_STATUS: {
                    return {
                        ...state,
                        client: {
                            id: payload.client.id,
                            username: payload.client.username,
                        }
                    }
                }
            }   
        }
        case AUTHENTICATE: {
            switch(status) {
                case OK_STATUS: {
                    return {
                        ...state,
                        client: {
                            id: payload.client.id,
                            username: payload.client.username,
                        }
                    }
                }
            }   
        }
        default: return state;
    }
}

export default domainReducer;