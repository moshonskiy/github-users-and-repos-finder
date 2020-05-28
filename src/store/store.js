import { createStore, combineReducers } from 'redux';
import { users } from '../reducers/users';
import { user } from '../reducers/user';
import { repos } from '../reducers/repos';
import { inputText } from '../reducers/inputText';
import { alert } from '../reducers/alert';
import { loading } from '../reducers/loading';

const rootReducer = combineReducers({
    users,
    user,
    repos,
    inputText,
    alert,
    loading
});

export const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );