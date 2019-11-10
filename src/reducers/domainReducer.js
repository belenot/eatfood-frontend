import { REGISTRATE, OK_STATUS, AUTHENTICATE, GET_FOODS, ERR_STATUS, REQUEST_STATUS, ADD_FOOD } from "../actions";

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
        case GET_FOODS: {
            switch(status) {
                case OK_STATUS: {
                    return {
                        ...state,
                        foods: [...payload.foods]
                    }
                }
            }
        }
        case ADD_FOOD: {
            switch(status) {
                case OK_STATUS: {
                    return {
                        ...state,
                        foods: [...state.foods, payload.food]
                    }
                }
            }
        }
}
    return state;
}

export default domainReducer;