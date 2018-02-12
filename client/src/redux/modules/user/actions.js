import { dispatchRequest } from '../../utils/fetchUtils';
import * as Reducer from './reducer';
import { Reducers as AlertReducer } from '../alert';

export function register(email, password, confirmPassword, firstName, lastName, phone) {
    return dispatch => {
        dispatchRequest('api/register', 'POST', {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phone
        }, data => {
            dispatch(AlertReducer.success('You have registered successfully.'));
            dispatch(Reducer.register(data));
        }, err => dispatch(AlertReducer.error(err['errors'][0])));
    }
}

export function login(email, password) {
    return dispatch => {
        dispatchRequest('api/login', 'POST', {
            email,
            password
        }, data => {
            dispatch(AlertReducer.success('You have logged in successfully.'));
            localStorage.setItem('id_token', data.token);
            dispatch(Reducer.login(data));
        }, err => dispatch(AlertReducer.error(err['errors'][0])));
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