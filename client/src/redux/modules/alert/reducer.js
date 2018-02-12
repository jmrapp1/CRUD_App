import { SUCCESS, ERROR, CLEAR } from './constants';

const initialState = { };

export const success = message => (
    { type: SUCCESS, message }
);

export const error = message => (
    { type: ERROR, message }
);

export const clear = (
    { type: CLEAR }
);

export default {
    alert: ( state = initialState, action ) => {
        switch (action.type) {
            case SUCCESS: {
                return { type: 'alert-success', message: action.message };
            }
            case ERROR: {
                return { type: 'alert-danger', message: action.message };
            }
            case CLEAR: {
                return { };
            }
            default:
                return state;
        }
    }
}
