const initialState = {
    tests: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TESTS":
            return { ...state, tests: action.tests};
        case "CREATE_TEST":
            return { ...state, tests: [...state.tests, action.data] };
        default:
            return state;
    }
};

export default rootReducer;
