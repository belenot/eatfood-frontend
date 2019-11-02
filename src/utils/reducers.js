import { NOT_FOUND_IMG } from "./constants";
import { initState } from "./states";
import { format } from "date-fns";

const dateFormat = 'yyyy-MM-dd';

function removeDisplayedError(oldState, newState) {
    if (oldState.authenticationPage.error) {
        newState.authenticationPage.error = '';
    }
    return newState;
}

function postProcess(oldState, newState) {
    var state = newState;
    state = removeDisplayedError(oldState, newState);
    return state;

}

export function reducer (state={}, action= {type:'',payload:{}}) {
    const {type, payload} = action;
    var newState;
    switch (type) {
        case 'INIT_CLIENT_OK': {
            newState = { ...state, client: {...payload.client, authenticated: true}}
            break;
        }
        case 'INIT_CLIENT_ERROR': {
            newState = { ...state, authenticated: false}
            break;
        }
        case 'INIT_FOODS_OK': {
            newState = { ...state, foods: [ ...payload.foods] }
            break;
        }
        case 'INIT_PORTIONS_OK': {
            newState = { ...state, portions: [ ...payload.portions ]}
            break;
        }
        case 'AUTHENTICATION_PAGE_CHANGE': {
            newState = { ...state, authenticationPage: { ...state.authenticationPage, page: payload.page}}
            break;
        }
        case 'AUTHENTICATION_PAGE_TYPE': {
            newState = { ...state,
                authenticationPage: { ...state.authenticationPage,
                    [payload.page]: { ...state.authenticationPage[payload.page],
                        [payload.key]: payload.value
                    }
                }
            }
            break;
        }
        case 'AUTHENTICATION_PAGE_SIGNIN_OK': {
            newState = { ...initState,
                client: { 
                    ...payload.clientModel,
                    authenticated: true
                }
            }
            break;
        }
        case 'AUTHENTICATION_PAGE_SIGNIN_ERROR': {
            newState = { ...initState,
                authenticationPage: { ...state.authenticationPage,
                    error: payload.error
                }
            };
            break;
        }
        case 'AUTHENTICATION_PAGE_SIGNUP_OK': {
            newState = { ...initState,
                client: { 
                    ...payload.clientModel,
                    authenticated: true
                }
            }
            break;
        }
        case 'AUTHENTICATION_PAGE_SIGNUP_ERROR': {
            newState = { ...initState,
                authenticationPage: { ...state.authenticationPage,
                    error: payload.error
                }
            };
            break;
        }
        case 'ADD_FOOD': {
            newState = { ...state, foods: [ payload.food, ...state.foods] };
            break;
        }
        case 'DELETE_FOOD': {
            newState = { ...state, 
                foods: state.foods.filter(food=>food.id!=payload.food.id),
                portions: state.portions.filter(portion=>portion.food.id!=payload.food.id)
            };
            break;
        }
        case 'UPDATE_FOOD': {
            newState = { ...state, 
                foods: state.foods.map(food=>food.id!=payload.food.id?food:{ ...payload.food }),
                portions: state.portions.map(portion=>portion.food.id!=payload.food.id?portion:{ ...portion, food: { ...payload.food } })
            };
            break;
        }
        case 'ADD_PORTION': {
            newState = { ...state, portions: [{...payload.portion}, ...state.portions] };
            break;
        }
        case 'DELETE_PORTION': {
            newState = { ...state, portions: state.portions.filter(portion=>portion.id!=payload.portion.id) };
            break;
        }
        case 'UPDATE_PORTION': {
            newState = { ...state, portions: state.portions.map(portion=>portion.id!=payload.portion.id?portion:{ ...payload.portion }) };
            break;
        }
        case 'OPEN_VIEWED_FOOD': {
            newState = { ...state, 
                viewedFood: { 
                    show: true, 
                    food: state.foods.find(f=>f.id == payload.foodId), 
                    img: payload.img||NOT_FOUND_IMG 
                }
            };
            break;
        }
        case 'CLOSE_VIEWED_FOOD': {
            newState = { ...state, viewedFood: {show: false}};
            break;
        }
        case 'OPEN_VIEWED_PORTION': {
            newState = { ...state,
                viewedPortion: {
                    show: true,
                    portion: {...state.portions.find(portion=>portion.id==payload.portion.id)},
                    img: payload.img||NOT_FOUND_IMG
                }
            };
            break;
        }
        case 'CLOSE_VIEWED_PORTION': {
            newState = { ...state, viewedPortion: {show: false}};
            break;
        }
        case 'CHANGE_CHART_DATE_INTERVAL': {
            newState = { ...state, chart: {...state.chart, interval: payload.interval } };
            break;
        }
        case 'LOGIN': {
            newState = {
                ...initState,
                client: { ...payload.client }
            };
            break;
        }
        case 'LOGOUT': {
            newState = {
                ...initState,
                client: {
                    ...state.client,
                    authenticated: false
                }
            };
            break;
        }
        case 'ON_ADD_PORTION': {
            newState = {
                ...state,
                portions: [{isAdding: true, old: null, value: {id: "new-"+new Date(), foodId: "", gram: 0, date: format(new Date(), dateFormat)}}, ...state.portions]
            }
            break;
        }
        case 'ON_PORTION_ROW_CHECK': {
            newState = {
                ...state,
                portions: state.portions.map(portion=>portion.value.id==payload.id ? (
                    {...portion, isChecked: !portion.isChecked}
                ) : (
                    portion
                ))
            }
            break;
        }
        case 'ON_DELETE_CHECKED_PORTIONS': {
            newState = {
                ...state,
                portions: state.portions.filter(portion=>!portion.isChecked)
            }
            break;
        }
        case 'ON_PORTION_ROW_EDIT': {
            newState = {
                ...state, 
                portions: state.portions.map(portion=>portion.value.id==payload.id ? (
                    {...portion, isEditing: true, old: {...portion.value}}
                ) : (
                    portion
                ))
            }
            break;
        }
        case 'HANDLE_PORTION_ROW_EDIT_CHANGE': {
            newState = {
                ...state,
                portions: state.portions.map(portion=>portion.value.id==payload.id ? (
                    {...portion, value: {...portion.value, [payload.key]: payload.value}}
                ) : (
                    portion
                ))
            }
            break;
        }
        case 'ON_PORTION_ROW_EDIT_BREAK': {
            newState = {
                ...state,
                portions: state.portions.map(function(portion){
                    if (portion.value.id==payload.id && portion.isEditing) {
                        return {...portion, isEditing: false, value: {...portion.old}, old: null}
                    } else if (portion.value.id==payload.id && portion.isAdding) {
                        return undefined;
                    } else {
                        return portion
                    }
                }).filter(portion=>portion!==undefined)
            }
            break;
        }
        case 'ON_PORTION_ROW_EDIT_DONE': {
            newState = {
                ...state,
                portions: state.portions.map(portion=>portion.value.id==payload.id ? (
                    {...portion, isEditing: false, isAdding: false, old: null}
                ) : (
                    portion
                ))
            }
            break;
        }
        case 'ON_PORTION_DELETE': {
            newState = {
                ...state,
                portions: state.portions.filter(portion=>portion.value.id!=payload.id)
            }
            break;
        }
        default: {
            console.warn(`Not found handler for ${type} action`);
            newState = state;
        }
    }
    return postProcess(state, newState);
}