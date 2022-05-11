import { GET_ALL_RECIPES, GET_RECIPES_BY_NAME, GET_RECIPES_BY_ID, POST_NEW_RECIPES, GET_DIETS, FILTER_BY_DIETS, FILTER_BY_UPLOADED, SORT_BY_NAME, SORT_BY_SCORE } from "../actions/index.js";

const initialState = {
  recipes: [],
  copyRecipes: [],
  copyOfRecipes: [],
  diets: [],
  details: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload,
        copyOfRecipes: action.payload
      };
    case GET_RECIPES_BY_ID:
      return {
        ...state,
        details: action.payload,
      };
    case GET_RECIPES_BY_NAME: 
      return {
        ...state,
        recipes: action.payload
      };
    case POST_NEW_RECIPES:
      return {
        ...state
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      };  
    case FILTER_BY_DIETS:
      const allDiets = state.copyRecipes;
      const diet = action.payload === "All"
          ? allDiets
          : allDiets.filter((d) => {
              const diets = d.diets?.map((dt) => {
                  if(typeof dt === 'object') {
                    return dt.name
                  }
                  else {
                    return dt
                  }   
              })
              if(diets.includes(action.payload)){
                  return d
              }
            })
      return {
        ...state,
        recipes: diet,
      };
    case SORT_BY_NAME: 
      const sortByAlf = action.payload === "Ascendent"
        ? state.copyOfRecipes.sort((a, b) => {
          if(a.name > b.name) {
            return 1;
          }
          if(a.name < b.name) {
            return -1;
          }
          return 0;
          })
        : state.copyOfRecipes.sort((a, b) => {
          if(a.name > b.name) {
            return -1;
          } 
          if(a.name < b.name) {
            return 1;
          }
          return 0;
          })
      return {
        ...state,
        recipes: sortByAlf,
      };
    case SORT_BY_SCORE:
      const sortByScore = action.payload === "Lower Score"
      ? state.copyOfRecipes.sort((a, b) => {
        if(a.score > b.score) {
          return 1
        }
        if(a.score < b.score) {
          return -1
        }
        return 0
        })
      : state.copyOfRecipes.sort((a, b) => {
        if(a.score > b.score) {
          return -1
        }
        if(a.score < b.score) {
          return 1
        }
        return 0
        })
      return {
        ...state,
        recipes: sortByScore
      }
    default:
      return state;
  }
};

export default rootReducer;
