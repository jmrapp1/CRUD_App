import { dispatchRequest, stringifyObject } from '../../utils/fetchUtils';
import * as Reducer from './reducer';
import { Reducers as AlertReducer } from '../alert';

export function getCustomers(size, offset) {
    return dispatch => {
        dispatchRequest('api/customer?' + stringifyObject({
            size,
            offset
        }), 'GET', {}, data => {
            dispatch(Reducer.getCustomers(data));
        }, err => {
            dispatch(AlertReducer.error(err['errors'][0]));
        });
    }
}

export function getTotalCustomers() {
    return dispatch => {
        dispatchRequest('api/customer/count', 'GET', {}, data => {
            dispatch(Reducer.getTotalCustomers(data));
        }, err => {
            dispatch(AlertReducer.error(err['errors'][0]));
        });
    }
}