import { success as successReducer, error as errorReducer } from './reducer';

export function success( message ) {
    return dispatch => {
        dispatch(successReducer(message));
    }
}

export function error( message ) {
    return dispatch => {
        dispatch(errorReducer(message));
    }
}