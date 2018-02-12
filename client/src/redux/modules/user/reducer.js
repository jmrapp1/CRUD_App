import { LOGIN, REGISTER, LOGOUT } from './constants';
const jwtDecode = require('jwt-decode');

const initialState = {
    user: {},
    loggedIn: false
};

export const register = data => (
    { type: REGISTER, data }
);

export const login = data => (
    { type: LOGIN, data }
);

export const logout = (
    { type: LOGOUT }
);

export default {
    user: ( state = initialState, action ) => {
        switch (action.type) {
            case LOGIN: {
                const user = jwtDecode(action.data.token);
                return {
                    user,
                    loggedIn: true
                }
            }
            case LOGOUT: {
                return {
                    user: {},
                    loggedIn: false
                };
            }
            case REGISTER: {
                return state; // Keep same state
            }
            default:
                return state;
        }
    }
}
