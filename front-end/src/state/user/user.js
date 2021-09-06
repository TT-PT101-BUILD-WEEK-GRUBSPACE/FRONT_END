import {userInitialState} from '../store';
import { 
  USER_LOGGED_IN,
  USER_CREATED,
  USER_LOGGED_OUT,
  USER_RECIPES_RECEIVED,
  USER_AUTH_CHECKED,
  USER_RECIPE_ADDED_TO_LIST,
  USER_RECIPE_REMOVED_FROM_LIST
} from '../actionTypes';


//Actions

//setUser
export const logout=()=>{
  // remove token from localStorage
  console.log("logout complete")
  localStorage.clear()
  return {type:USER_LOGGED_OUT}
};
export const addRecipeToMyList=(id)=>{
  return {type:USER_RECIPE_ADDED_TO_LIST,payload:id};
};

export const removeRecipeFromMyList=(id)=>{
  return {type:USER_RECIPE_REMOVED_FROM_LIST,payload:id};
};

// retain user state action
export const checkUserAuth =() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
    return {type: USER_AUTH_CHECKED,payload:user};
  }
  else{
    localStorage.clear();
    return {type: USER_AUTH_CHECKED,payload:{}};
  }
}

//Reducer
export const userReducer = (state = userInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case USER_LOGGED_IN: {
      // backend may return a user object
      const {user_id, user_email, username} = action.payload;
      return {
        ...state,
        user_id,
        user_email,
        username
      };
    }
    case USER_LOGGED_OUT:{
      // empty out user state
      return userInitialState;
    }
    case USER_CREATED: {
      // backend may return a user object
      const {user_id, user_email, username} = action.payload;
      return {
        ...state,
        user_id,
        user_email,
        username
      };
    }
    case USER_RECIPES_RECEIVED:{
      const myList = action.payload.filter(recipe=>recipe.user_id===state.id);
      return {
        ...state,
        myList
      }
    }
    case USER_RECIPE_ADDED_TO_LIST:{
      const recipe_id = action.payload;
      return {
        ...state,
        myList:[...state.myList,recipe_id]//mylist
      }
    }
    case USER_RECIPE_REMOVED_FROM_LIST:{
      const recipe_id = action.payload;
      return {
        ...state,
        myList:state.myList.filter((id)=>id!==recipe_id)//mylist
      }
    }
    case USER_AUTH_CHECKED:{
      const user = action.payload;
      return {
        ...state,
        ...user
      };
    }
    default:
      return state;
  }
};