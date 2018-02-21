import { REGISTER, GET_LIST, GET_TOTAL } from './constants';
const jwtDecode = require('jwt-decode');

const initialState = {
    employees: [],
    total: 0
};

export const register = data => (
    { type: REGISTER, data }
);

export const getEmployees = employees => (
    { type: GET_LIST, employees }
);

export const getTotalEmployees = total => (
    { type: GET_TOTAL, total }
);

export default {
    employee: ( state = initialState, action ) => {
        switch (action.type) {
            case GET_LIST: {
                return {
                    employees: action.employees,
                    total: state.total
                }
            }
            case GET_TOTAL: {
                return {
                    employees: state.employees,
                    total: action.total
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
