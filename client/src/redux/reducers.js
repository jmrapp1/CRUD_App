import { combineReducers } from 'redux';
import { Reducer as userReducer } from './modules/user/';
import { Reducer as employeeReducer } from './modules/employee/';
import { Reducer as customerReducer } from './modules/customer/';

export default combineReducers({
    ...userReducer,
    ...employeeReducer,
    ...customerReducer
});