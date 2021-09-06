import { RECIPES_RECEIVED } from '../actionTypes';
import {recipesInitialState} from '../store';



//Actions

//setUser






//Reducer
export const recipesReducer = (state = recipesInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case RECIPES_RECEIVED: {
      const recipes = action.payload;
      return recipes;
    }
    default:
      return state;
  }
};