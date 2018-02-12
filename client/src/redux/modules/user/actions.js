import { dispatchRequest } from '../../utils/fetchUtils';
import { register as registerReducer } from './reducer';
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
            dispatch(registerReducer(data));
        }, err => dispatch(AlertReducer.error(err['errors'][0])));
    }
}