import { dispatchRequest, stringifyObject } from '../../utils/fetchUtils';
import * as Reducer from './reducer';

export function register(email, password, confirmPassword, firstName, lastName, phone, payRate, monday, tuesday, wednesday,
                         thursday, friday, saturday, sunday, successCallback, errorCallback) {
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
            dispatch(Reducer.register(data));
            dispatch(successCallback('You have registered the employee successfully.'));
        }, err => {
            if (err['errors'][0]) {
                dispatch(errorCallback(err['errors'][0]));
            }
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
            if (err['errors'][0]) {
                console.error(err['errors'][0]);
            }
        });
    }
}

export function getTotalEmployees() {
    return dispatch => {
        dispatchRequest('api/employee/count', 'GET', {}, data => {
            dispatch(Reducer.getTotalEmployees(data));
        }, err => {
            if (err['errors'][0]) {
                console.error(err['errors'][0]);
            }
        });
    }
}