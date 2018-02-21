import { combineReducers } from 'redux';
import { Reducer as userReducer } from './modules/user/';
import { Reducer as alertReducer } from './modules/alert/';
import { Reducer as employeeReducer } from './modules/employee/';
import { Reducer as customerReducer } from './modules/customer/';

export default combineReducers({
    ...userReducer,
    ...alertReducer,
    ...employeeReducer,
    ...customerReducer
});