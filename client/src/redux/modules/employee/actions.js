import { dispatchRequest, stringifyObject } from '../../utils/fetchUtils';
import * as Reducer from './reducer';
import { Reducers as AlertReducer } from '../alert';

export function register(email, password, confirmPassword, firstName, lastName, phone, payRate, monday, tuesday, wednesday,
                         thursday, friday, saturday, sunday) {
    return dispatch => {
        dispatchRequest('api/employee/register', 'POST', {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phone,
            payRate,
            monday, tuesday, wednesday, thursday, friday, saturday, sunday
        }, data => {
            dispatch(AlertReducer.success('You have registered the employee successfully.'));
            dispatch(Reducer.register(data));
        }, err => {
            dispatch(AlertReducer.error(err['errors'][0]));
        });
    }
}

export function getEmployees(size, offset) {
    return dispatch => {
        dispatchRequest('api/employee?' + stringifyObject({
            size,
            offset
        }), 'GET', {}, data => {
            dispatch(Reducer.getEmployees(data));
        }, err => {
            dispatch(AlertReducer.error(err['errors'][0]));
        });
    }
}