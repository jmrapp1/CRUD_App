import * as Reducers from './reducer';

export function success( message ) {
    return dispatch => {
        dispatch(Reducers.success(message));
    }
}

export function error( message ) {
    return dispatch => {
        dispatch(Reducers.error(message));
    }
}

export function clear() {
    return dispatch => {
        dispatch(Reducers.clear());
    }
}