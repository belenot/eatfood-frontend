import { NOT_FOUND_IMG } from "./constants";

export function reducer (state={}, action= {type:'',payload:{}}) {
    const {type, payload} = action;
    switch (type) {
        case 'ADD_FOOD': {
            return { ...state, foods: [ payload.food, ...state.foods] };
        }
        case 'DELETE_FOOD': {
            return { ...state, 
                foods: state.foods.filter(food=>food.id!=payload.food.id),
                portions: state.portions.filter(portion=>portion.food.id!=payload.food.id)
            };
        }
        case 'UPDATE_FOOD': {
            return { ...state, 
                foods: state.foods.map(food=>food.id!=payload.food.id?food:{ ...payload.food }),
                portions: state.portions.map(portion=>portion.food.id!=payload.food.id?portion:{ ...portion, food: { ...payload.food } })
            };
        }
        case 'ADD_PORTION': {
            return { ...state, portions: [{...payload.portion}, ...state.portions] };
        }
        case 'DELETE_PORTION': {
            return { ...state, portions: state.portions.filter(portion=>portion.id!=payload.portion.id) };
        }
        case 'UPDATE_PORTION': {
            return { ...state, portions: state.portions.map(portion=>portion.id!=payload.portion.id?portion:{ ...payload.portion }) };
        }
        case 'OPEN_VIEWED_FOOD': {
            return { ...state, 
                viewedFood: { 
                    show: true, 
                    food: state.foods.find(f=>f.id == payload.foodId), 
                    img: payload.img||NOT_FOUND_IMG 
                }
            }
        }
        case 'CLOSE_VIEWED_FOOD': {
            return { ...state, viewedFood: {show: false}}
        }
        case 'OPEN_VIEWED_PORTION': {
            console.log(payload);
            return { ...state,
                viewedPortion: {
                    show: true,
                    portion: {...state.portions.find(portion=>portion.id==payload.portion.id)},
                    img: payload.img||NOT_FOUND_IMG
                }
            }
        }
        case 'CLOSE_VIEWED_PORTION': {
            return { ...state, viewedPortion: {show: false}}
        }
        default: console.warn(`Not found handler for ${type} action`);
    }
    return state;
}