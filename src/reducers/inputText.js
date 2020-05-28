export const inputText = (state = '', action) => {
    switch(action.type) {
        case 'HANDLE_TEXT_INPUT':
            return action.payload;
        default:
            return state;
    }
}