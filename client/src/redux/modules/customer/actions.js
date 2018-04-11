import { dispatchRequest, stringifyObject } from '../../utils/fetchUtils';
import * as Reducer from './reducer';

export function getCustomers(size, offset) {
    return dispatch => {
        dispatchRequest('api/customer?' + stringifyObject({
            size,
            offset
        }), 'GET', {}, data => {
            dispatch(Reducer.getCustomers(data));
        }, err => {
            console.error(err['errors'][0]);
        });
    }
}

export function getTotalCustomers() {
    return dispatch => {
        dispatchRequest('api/customer/count', 'GET', {}, data => {
            dispatch(Reducer.getTotalCustomers(data));
        }, err => {
            console.error(err['errors'][0]);
        });
    }
}