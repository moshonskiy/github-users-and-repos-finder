export const repos = (state = [], action) => {
    switch(action.type) {
        case 'GET_USER_REPOS':
            return action.payload;
        default:
            return state;
    }
}