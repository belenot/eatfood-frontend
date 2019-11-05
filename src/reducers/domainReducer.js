function domainReducer(
    state={
        client: {
            login: '',
            name: '',
        },
        foods: [],
        portions: []
    },
    action
) {
    const {type, payload} = action;
    switch(type) {
        default: return state;
    }
}

export default domainReducer;