export const users = (state = [], action) => {
    switch(action.type) {
        case 'SEARCH_USERS': 
            return [...action.payload];
        default:
            return state;
    }
}