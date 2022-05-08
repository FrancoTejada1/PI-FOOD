import axios from 'axios';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES_BY_ID = 'GET_RECIPES_BY_ID';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const POST_NEW_RECIPES = 'POST_NEW_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';

export function getAllRecipes(){
    return function(dispatch){
       axios.get(`http://localhost:3001/recipes`)
       .then(json => {
           dispatch({
               type: GET_ALL_RECIPES,
               payload: json.data
           })
       })
       .catch((error) => {
           console.log(error)
       }) 
    }
};

export function getDetails(id){
    return function(dispatch){
        axios.get(`http://localhost:3001/recipes/${id}`)
        .then(details => {
            dispatch({
                type: GET_RECIPES_BY_ID,
                payload: details.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export function getRecipesByName(name){
    return function(dispatch){
        axios.get(`http://localhost:3001/recipes?name=${name}`)
        .then(json => {
            dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: json.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
};

export function filterByDiets(payload){
    return {
        type: FILTER_BY_DIETS,
        payload: payload
    }
};

export function sortByName(payload){
    return {
        type: SORT_BY_NAME,
        payload: payload
    }
};

export function sortByScore(payload){
    return {
        type: SORT_BY_SCORE,
        payload: payload
    }
};

export function postRecipes(payload){
    return function(dispatch){
        axios.post(`http://localhost:3001/recipes`, payload)
        .then(json => {
            return json
        })
    }
};

export function getDiets(){
    return function(dispatch){
        axios.get(`http://localhost:3001/types`)
        .then(json => {
            dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}