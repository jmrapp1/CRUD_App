import { GET_LIST, GET_TOTAL } from './constants';

const initialState = {
    customers: [],
    total: 0
};

export const getCustomers = customers => (
    { type: GET_LIST, customers }
);

export const getTotalCustomers = total => (
    { type: GET_TOTAL, total }
);

export default {
    customer: ( state = initialState, action ) => {
        switch (action.type) {
            case GET_LIST: {
                return {
                    customers: action.customers,
                    total: state.total
                }
            }
            case GET_TOTAL: {
                return {
                    customers: state.customers,
                    total: action.total
                }
            }
            default:
                return state;
        }
    }
}
