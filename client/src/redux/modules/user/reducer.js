import { LOGIN, REGISTER } from './constants';

const initialState = {
    userData: {},
    loggedIn: false
};

export const register = data => (
    { type: REGISTER, data }
);

export default {
    user: ( state = initialState, { type, data } ) => {
        switch (type) {
            case LOGIN: {

                break;
            }
            case REGISTER: {
                return state; // Keep same state
            }
            default:
                return state;
        }
    }
}
