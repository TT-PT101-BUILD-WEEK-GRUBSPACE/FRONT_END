import {
  FETCHING_API_START,
  FETCHING_API_SUCCESS,
  FETCHING_API_FAILURE,
  CREATE_RECIPE_START,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  UPDATE_RECIPE_START,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE,
  DELETE_RECIPE_START,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
  FETCH_USER_RECIPE_START,
  FETCH_USER_RECIPE_SUCCESS,
  FETCH_USER_RECIPE_FAILURE,
  SEARCH_USER_RECIPE_START,
  SEARCH_USER_RECIPE_SUCCESS,
  SEARCH_USER_RECIPE_FAILURE,
  // UPDATE_RECIPE_VALUE,
  // DELETE_RECIPE_VALUE,
  // SEARCH_RECIPE_VALUE,
  SEARCH_VALUE,
  FORM_VALUE,
} from "../actions";

const log = console.log;

//1. set initialState
const initialState = {
  loading: false,
  error: "",
  searchValue: "",
};

//2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
export const appReducer = (state = initialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case FETCHING_API_START: {
      //log("FETCH RUNNING THROUGH REDUCER");
      return { ...state, loading: true };
    }
    case FETCHING_API_SUCCESS: {
      //log("FETCH SUCCESS THROUGH REDUCER");
      return { ...state, loading: false, recipe: action.payload };
    }
    case FETCHING_API_FAILURE: {
      //log("FETCH FAIL FROM REDUCER");
      return { ...state, loading: false, error: action.payload };
    }
    case SEARCH_VALUE: {
      //log("SEARCH VALUE FROM REDUCER", action.payload);
      return { ...state, searchValue: action.payload };
    }
    case CREATE_RECIPE_START: {
      log("CREATE RECIPE RUNNING THROUGH REDUCER")
      return { ...state, loading: true };
    }
    case CREATE_RECIPE_SUCCESS: {
      log('FETCH USER SUCCESS THROUGH REDUCER')
      return { ...state, loading: false, userRecipe: action.payload}
    }
    case CREATE_RECIPE_FAILURE: {
      log('FETCH USER FAILURE THROUGH REDUCER')
      return { ...state, loading: false, error: action.payload}
    } 
    case UPDATE_RECIPE_START: {
      log('UPDATE RECIPE RUNNING THROUGH REDUCER')
      return { ...state, loading: true}
    }
    case UPDATE_RECIPE_SUCCESS: {
      return { ...state, loading: false, userRecipe: action.payload}
    }
    case UPDATE_RECIPE_FAILURE: {
      log('UPDATE USER FAILURE THROUGH REDUCER')
      return { ...state, loading: false, error: action.payload}
    }
    case DELETE_RECIPE_START: {
      log('DELETE RECIPE RUNNING THROUGH REDUCER')
      return { ...state, loading: true}
    }
    case DELETE_RECIPE_SUCCESS: {
      log('DELETE RECIPE SUCCESS THROUGH REDUCER')
      return { ...state, loading: false, userRecipe: action.payload}
    }
    case DELETE_RECIPE_FAILURE: {
      log('DELETE USER FAILURE THROUGH REDUCER')
      return { ...state, loading: false, error: action.payload}
    }
    case FETCH_USER_RECIPE_START: {
      log('FETCH USER RUNNING THROUGH REDUCER')
      return { ...state, loading: true}
    }
    case FETCH_USER_RECIPE_SUCCESS: {
      log('FETCH USER RECIPE SUCCESS THROUGH REDUCER')
      return { ...state, loading: false, userRecipe: action.payload}
    }
    case FETCH_USER_RECIPE_FAILURE: {
      log('FETCH USER FAILURE THROUGH REDUCER')
      return { ...state, loading: false, error: action.payload}
    }
    case SEARCH_USER_RECIPE_START: {
      log('search user recipe running through reducer')
      return { ...state, loading: true}
    }
    case SEARCH_USER_RECIPE_SUCCESS: {
      log('SEARCH USER RECIPE SUCCESS THROUGH REDUCER')
      return { ...state, loading: false, userRecipe: action.payload}
    }
    case SEARCH_USER_RECIPE_FAILURE: {
      log('SEARCH USER FAILURE THROUGH REDUCER')
      return { ...state, loading: false, error: action.payload}
    }
    case FORM_VALUE: {
      log('FORM VALUE RUNNING THROUGH REDUCER')
      return { ...state, formValue: action.payload}
    }
     
    default:
      return state;
  }
};
