import {useReducer} from 'react';

const initState = {
    page: 'foods'
}

function reducer(state, action) {
    const {type, payload} = action;
    switch(type) {
        case 'onTogglePage': {
            return {
                ...state,
                page: payload.contentPage
            }
        }
    }
}

export function useContentPanel() {
    const [state, dispatch] = useReducer(reducer, {...initState});
    return [state, dispatch];
}