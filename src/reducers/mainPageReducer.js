import { HANDLE_MAIN_PAGE } from "../actions";

function mainPageReducer(
    state={
        activePage: 'foodsPage'
    },
    action
) {
    const {type, payload} = action;
    switch(type) {
        case HANDLE_MAIN_PAGE: {
            return payload.handle(state);
        }
    }
    return state;
}

export default mainPageReducer;