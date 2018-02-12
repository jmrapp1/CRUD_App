import { combineReducers } from 'redux';
import { Reducer as userReducer } from './modules/user/';
import { Reducer as alertReducer } from './modules/alert/';

export default combineReducers({
    ...userReducer,
    ...alertReducer
});