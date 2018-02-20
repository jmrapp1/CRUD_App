import { REGISTER } from './constants';
const jwtDecode = require('jwt-decode');

const initialState = {
    employees: {}
};

export const register = data => (
    { type: REGISTER, data }
);

export default {
    employee: ( state = initialState, action ) => {
        switch (action.type) {
            case REGISTER: {
                return state; // Keep same state
            }
            default:
                return state;
        }
    }
}
