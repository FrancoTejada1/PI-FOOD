import axios from 'axios';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES_BY_ID = 'GET_RECIPES_BY_ID';
export const GET_NEW_RECIPES = 'GET_NEW_RECIPES';

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