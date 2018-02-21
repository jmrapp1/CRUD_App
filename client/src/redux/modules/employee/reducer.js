import { REGISTER, GET_LIST } from './constants';
const jwtDecode = require('jwt-decode');

const initialState = {
    employees: []
};

export const register = data => (
    { type: REGISTER, data }
);

export const getEmployees = data => (
    { type: GET_LIST, data }
);

export default {
    employee: ( state = initialState, action ) => {
        switch (action.type) {
            case GET_LIST: {
                return {
                    employees: action.data
                }
            }
            case REGISTER: {
                return state; // Keep same state
            }
            default:
                return state;
        }
    }
}
