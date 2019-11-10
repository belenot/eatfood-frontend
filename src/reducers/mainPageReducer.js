import { HANDLE_MAIN_PAGE, GET_FOODS, ERR_STATUS, REQUEST_STATUS, OK_STATUS, ADD_FOOD } from "../actions";

function mainPageReducer(
    state={
        activePage: 'foodsPage',
        gettingFoods: false,
        openAddFoodDialog: false,
        addFoodError: '',
        addingFoodRequest: false,
        addingFood: {
            name: '',
            nutrients: {
                calories: 0,
                protein: 0,
                carbohydrate: 0,
                fat: 0
            },
            parentId: 0,
            authorId: 0
        }
    },
    action
) {
    const {type, payload, status, error} = action;
    switch(type) {
        case HANDLE_MAIN_PAGE: {
            return payload.handle(state);
        }
        case GET_FOODS: {
            switch(status){
                case OK_STATUS: {
                    return {
                        ...state,
                        gettingFoods: false
                    }
                }
                case ERR_STATUS: {
                    return {
                        ...state,
                        error,
                        gettingFoods: false
                    }
                }
                case REQUEST_STATUS: {
                    return {
                        ...state,
                        gettingFoods: true
                    }
                }
            }
        }
        case ADD_FOOD: {
            switch(status) {
                case OK_STATUS: {
                    return {
                        ...state,
                        openAddFoodDialog: false,
                        addingFoodRequest: false,
                        addFoodError: ''
                    }
                }
                case ERR_STATUS: {
                    return {
                        ...state,
                        addingFoodRequest: false,
                        addFoodError: error
                    }
                }
                case REQUEST_STATUS: {
                    return {
                        ...state,
                        addingFoodRequest: true
                    }
                }
            }
        }
    }
    return state;
}

export default mainPageReducer;