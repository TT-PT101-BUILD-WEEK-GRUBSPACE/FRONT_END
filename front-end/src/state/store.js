// This is where we will store all the states
import {API_IDLE} from "./constants";
export const apiInitialState = {
      postLogIn:{ // [POST]auth/users/login
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      createUser:{ // [POST]auth/users/register
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      getRecipes:{ // [GET]api/recipes
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      getRecipe:{ //[GET]api/recipes/:id
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      createRecipe:{ //[POST]api/recipes
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      updateRecipe:{ //[PUT]api/recipes/:id
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      deleteRecipe:{ //[DELETE]api/recipes/:id
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      getRecipesFromMyList:{ //[GET]api/recipes/my-list
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      addRecipeToMyList:{ //[POST]api/recipes/my-list/:id
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      },
      removeRecipeFromMyList:{ //[POST]api/recipes/my-list/:id
        numberOfSuccessCalls:0,
        status:API_IDLE,
        errMsg:""
      }
  };


export const userInitialState = {
  user_id: -1,
  user_username:"",
  user_email:"",
  myList: [],
};

export const recipesInitialState = [];