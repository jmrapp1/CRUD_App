import { dispatchRequest, stringifyObject } from '../../utils/fetchUtils';
import * as Reducer from './reducer';
import { Reducers as AlertReducer } from '../alert/index';

export function register(email, password, confirmPassword, firstName, lastName, phone, payRate, monday, tuesday, wednesday,
                         thursday, friday, saturday, sunday, name, street, city, state, zipcode ) {
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
            dispatch(AlertReducer.success('You Have Registered The Manager Sucessfully.'));
            dispatch(Reducer.register(data));
        },err => {
            dispatch(AlertReducer.error(err['errors'][0]));
        });
    }

}