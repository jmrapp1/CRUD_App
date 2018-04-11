import { dispatchRequest, stringifyObject } from '../../utils/fetchUtils';
import * as Reducer from './reducer';

export function register(email, password, confirmPassword, firstName, lastName, phone, payRate, monday, tuesday, wednesday,
                         thursday, friday, saturday, sunday, name, street, city, state, zipcode, successCallback, errorCallback) {
    return dispatch =>{
        dispatchRequest('api/business/register', 'POST', {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            phone,
            payRate,
            monday, tuesday, wednesday, thursday, friday, saturday, sunday,
            name,
            street,
            city,
            state,
            zipcode
        }, data => {
            dispatch(successCallback('You have registered the business and its manager sucessfully.'));
            dispatch(Reducer.register(data));
        }, err => {
            console.error('Error: ' + JSON.stringify(err));
            if (err['errors'][0]) {
                dispatch(errorCallback(err['errors'][0]));
            }
        });
    }

}