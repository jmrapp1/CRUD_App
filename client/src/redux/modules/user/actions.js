import { dispatchRequest } from '../../utils/fetchUtils';
import * as Reducer from './reducer';
import { UserRoles } from '../../UserRoles';
const jwtDecode = require('jwt-decode');

export function register(email, password, confirmPassword, firstName, lastName, phone, successCallback, errorCallback) {
    return dispatch => {
        dispatchRequest('api/user/register', 'POST', {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phone
        }, data => {
            dispatch(successCallback('You have registered successfully.'));
            dispatch(Reducer.register(data));
        }, err => {
            dispatch(errorCallback(err['errors'][0]));
        });
    }
}

export function login(email, password, successCallback = () => {}, failCallback = () => {}) {
    return dispatch => {
        dispatchRequest('api/user/login', 'POST', {
            email,
            password
        }, data => {
            localStorage.setItem('id_token', data.token);
            const user = decodeUserDataToStoreFromLocal(dispatch);
            successCallback(user);
        }, err => {
            failCallback(err['errors'][0]);
        });
    }
}

export function decodeUserDataToStoreFromLocal(dispatch) {
    const token = localStorage.getItem('id_token');
    if (token) {
        const user = jwtDecode(token);
        dispatch(Reducer.login(user));
        return user;
    }
}

export function verifyRole(userData) {

}

export function navigateToRoleIndex(userRole, history) {
    if (userRole === UserRoles.CUSTOMER) history.push('/customer');
    if (userRole === UserRoles.EMPLOYEE) history.push('/employee');
    if (userRole === UserRoles.MANAGER) history.push('/manager');
}

export function validateUserRole(user, desiredRole, history) {
    if (Array.isArray(desiredRole)) {
        if (!desiredRole[user.role]) history.push('/');
    } else {
        if (user.role !== desiredRole) history.push('/');
    }
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