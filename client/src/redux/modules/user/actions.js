import { dispatchRequest } from '../../utils/fetchUtils';
import * as Reducer from './reducer';
import { Reducers as AlertReducer } from '../alert';
const jwtDecode = require('jwt-decode');

export function register(email, password, confirmPassword, firstName, lastName, phone) {
    return dispatch => {
        dispatchRequest('api/user/register', 'POST', {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phone
        }, data => {
            dispatch(AlertReducer.success('You have registered successfully.'));
            dispatch(Reducer.register(data));
        }, err => {
            dispatch(AlertReducer.error(err['errors'][0]));
        });
    }
}

export function login(email, password, successCallback = () => {}, failCallback = () => {}) {
    return dispatch => {
        dispatchRequest('api/user/login', 'POST', {
            email,
            password
        }, data => {
            dispatch(AlertReducer.success('You have logged in successfully.'));
            localStorage.setItem('id_token', data.token);

            const user = jwtDecode(data.token);
            dispatch(Reducer.login(user));
            successCallback(user);
        }, err => {
            dispatch(AlertReducer.error(err['errors'][0]));
            failCallback(err['errors'][0]);
        });
    }
}

export function navigateToRoleIndex(userRole, history) {
    if (userRole === 'CUSTOMER') history.push('/customer');
    if (userRole === 'EMPLOYEE') history.push('/employee');
    if (userRole === 'MANAGER') history.push('/manager');
}

function destroyLocalSession() {
    const subdomain = localStorage.subdomain;
    localStorage.clear();
    if (subdomain) {
        localStorage.subdomain = subdomain;
    }
}

export function logout() {
    return dispatch => {
        destroyLocalSession();
        dispatch(Reducer.logout());
    };
}