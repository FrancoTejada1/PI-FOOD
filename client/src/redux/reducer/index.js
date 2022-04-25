import { GET_ALL_RECIPES, GET_NEW_RECIPES, GET_RECIPES_BY_ID } from '../actions/index.js';

const initialState = {
    recipes: [],
    details: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case GET_RECIPES_BY_ID:
            return {
                ...state,
                details: action.payload
            }
        default:
            return state    
    }
};

export default rootReducer;