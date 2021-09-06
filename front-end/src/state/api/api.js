// please keep all the action creators and reducers in the same file

import { API_STATUS_CHANGE,
  Recipes_RECEIVED, 
  USER_CREATED, 
  USER_Recipes_RECEIVED, 
  USER_LOGGED_IN, 
} from '../actionTypes';
import {
  API_START,
  API_SUCCESS,
  API_FAILURE
 } from '../store/constants';
import {apiInitialState} from '../store/index';
import axios from "../../utils/axios";
import axiosWithAuth from "../../utils/axiosWithAuth";



// login
export const postLogIn = (formValues, handleAPIStatus) => (dispatch) =>{
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"postLogIn"
  }});
  axios.post(`auth/login`,formValues)
  .then(async(res)=>{
    await dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"postLogIn"}});//await changes behavior. wait for reducer to be called
      // dispatch other actions
      // dispatch USER_LOGGED_IN payload: res.data
    await dispatch({type:USER_LOGGED_IN,payload:res.data}); // 
    localStorage.setItem("authToken",res.data.token) //save the authentication
    localStorage.setItem('user', JSON.stringify(res.data))// save the user object in local storage
    if(handleAPIStatus){
      handleAPIStatus(true);
    }
  })
  .catch(async(err)=>{
    await dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"postLogIn",
      errMsg:err,
    }});
    if(handleAPIStatus){
      handleAPIStatus(false);
    }
  });
};




// signup
export const createUser = (formValues,handleAPIStatus) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"createUser"
  }});
  console.log(formValues)
  axios.post(`auth/register`,formValues)
  .then(async(res)=>{
    await dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"createUser"
    }});
    // dispatch other actions
    // dispatch USER_CREATED 
    await dispatch({type:USER_CREATED,payload:res.data});
    if(handleAPIStatus){
      handleAPIStatus(true);
    }
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"createUser",
      errMsg:err,
    }});
    if(handleAPIStatus){
        handleAPIStatus(false);
    }
  });
};

// get Recipes
export const getRecipes = (handleAPIStatus) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"getRecipes"
  }});
  axiosWithAuth().get(`api/recipes`)
  .then((res)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"getRecipes"
    }});
    // dispatch other actions
    dispatch({type:RECIPES_RECEIVED,payload:res.data}); // call the Recipes reducer
    if(handleAPIStatus){
        handleAPIStatus(true);
    }
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"getRecipes",
      errMsg:err
    }});
    if(handleAPIStatus){
        handleAPIStatus(false);
    }
  });
};

export const getRecipe = (recipe_id,handleAPIStatus) => (dispatch) =>{
    dispatch({type:API_STATUS_CHANGE,payload:{
        status:API_START,
        api:"getRecipe"
      }});
      axiosWithAuth().get(`api/recipes/${recipe_id}`)
      .then(async(res)=>{
        await dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_SUCCESS,
          api:"getRecipe"
        }});
        if(handleAPIStatus){
          handleAPIStatus(true,res.data);
        }
      })
      .catch((err)=>{
        dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_FAILURE,
          api:"getRecipe",
          errMsg:err
        }});
        if(handleAPIStatus){
            handleAPIStatus(false);
        }
      });
}

// post new Recipes
export const createRecipe = (recipe, handleAPIStatus) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"createRecipe"
  }});
  axiosWithAuth().post(`api/recipes`,recipe)
  .then(async(res)=>{
    await dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"createRecipe"
    }});
    // dispatch other actions
    // dispatch ITEM_CREATED
    await dispatch(getRecipes()); //make a get request to stay up to date with the backend
    if(handleAPIStatus){
      handleAPIStatus(true);
    }
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"createItem",
      errMsg:err
    }});
    if(handleAPIStatus){
        handleAPIStatus(false);
    }
  });
};

// put item by id
export const updateRecipe = (recipe,recipe_id,handleAPIStatus) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"updateRecipe"
  }});
  axiosWithAuth().put(`api/recipes/${recipe_id}`,recipe)
  .then(async(res)=>{
    await dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"updateRecipe"
    }});
    // dispatch other actions
    await dispatch(getRecipes()); //make a get request to stay up to date with the backend
    if(handleAPIStatus){
      handleAPIStatus(true);
    }
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"updateRecipe",
      errMsg:err
    }});
    if(handleAPIStatus){
        handleAPIStatus(false);
    }
  });
};

// delete item by id
export const deleteRecipe = (recipe_id,handleAPIStatus) => (dispatch) => {
  dispatch({type:API_STATUS_CHANGE,payload:{
    status:API_START,
    api:"deleteRecipe"
  }});
  axiosWithAuth().delete(`api/recipes/${recipe_id}`)
  .then(async(res)=>{
    await dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_SUCCESS,
      api:"deleteRecipe"
    }});
    await dispatch(getRecipes()); //make a get request to stay up to date with the backend
    if(handleAPIStatus){
      handleAPIStatus(true);
    }
  })
  .catch((err)=>{
    dispatch({type:API_STATUS_CHANGE,payload:{
      status:API_FAILURE,
      api:"deleteRecipe",
      errMsg:err
    }});
    if(handleAPIStatus){
        handleAPIStatus(false);
    }
  });
};
export const getRecipesFromMyList = (handleAPIStatus) => (dispatch) =>{
    dispatch({type:API_STATUS_CHANGE,payload:{
        status:API_START,
        api:"getRecipesFromMyList"
      }});
      axiosWithAuth().get(`api/recipes/my-list`)
      .then(async(res)=>{
        await dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_SUCCESS,
          api:"getRecipesFromMyList"
        }});
        await dispatch(getRecipes()); //make a get request to stay up to date with the backend
        if(handleAPIStatus){
          handleAPIStatus(true,res.data);
        }
      })
      .catch((err)=>{
        dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_FAILURE,
          api:"getRecipesFromMyList",
          errMsg:err
        }});
        if(handleAPIStatus){
            handleAPIStatus(false);
        }
      });
}
export const addRecipeToMyList = (recipe_id,handleAPIStatus) => (dispatch) =>{
    dispatch({type:API_STATUS_CHANGE,payload:{
        status:API_START,
        api:"addRecipeToMyList"
      }});
      axiosWithAuth().post(`api/recipes/my-list`,recipe_id)
      .then(async(res)=>{
        await dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_SUCCESS,
          api:"addRecipeToMyList"
        }});
        await dispatch(getRecipes()); //make a get request to stay up to date with the backend
        if(handleAPIStatus){
          handleAPIStatus(true);
        }
      })
      .catch((err)=>{
        dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_FAILURE,
          api:"addRecipeToMyList",
          errMsg:err
        }});
        if(handleAPIStatus){
            handleAPIStatus(false);
        }
      });
}
export const removeRecipeFromMyList = (recipe_id,handleAPIStatus) => (dispatch) =>{
    dispatch({type:API_STATUS_CHANGE,payload:{
        status:API_START,
        api:"removeRecipeFromMyList"
      }});
      axiosWithAuth().get(`api/recipes/my-list/${recipe_id}`)
      .then(async(res)=>{
        await dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_SUCCESS,
          api:"removeRecipeFromMyList"
        }});
        await dispatch(getRecipes()); //make a get request to stay up to date with the backend
        if(handleAPIStatus){
          handleAPIStatus(true);
        }
      })
      .catch((err)=>{
        dispatch({type:API_STATUS_CHANGE,payload:{
          status:API_FAILURE,
          api:"removeRecipeFromMyList",
          errMsg:err
        }});
        if(handleAPIStatus){
            handleAPIStatus(false);
        }
      });
}
// reducer

//2. create a features reducer that takes in initialState, sets it equal to state, and takes in an action
export const apiReducer = (state = apiInitialState, action) => {
  //3. initialize switch statement
  switch (action.type) {
    case API_STATUS_CHANGE: {
      const {status,api,errMsg} = action.payload;
      let calls = state[api].numberOfSuccessCalls;
      if(status===API_SUCCESS){
        calls++;
      }
      return { ...state,
         [api]:{
           numberOfSuccessCalls:calls,
           status,
           errMsg
         }
        };
    }
    default:
      return state;
  }
};

