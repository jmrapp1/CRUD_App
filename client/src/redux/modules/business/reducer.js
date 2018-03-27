import {REGISTER} from './constants';

const initialState={
    business: [],
    total: 0
}

export const register = data =>{
    {type: REGISTER, data}
};

export default{
    business: (state = initialState, action) =>{
        switch (action.type){
            case REGISTER:{
                return state;
            }
            default:
                return state;
        }
    }
}