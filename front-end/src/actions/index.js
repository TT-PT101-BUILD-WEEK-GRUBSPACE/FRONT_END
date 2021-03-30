import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
//RECIPE CRUD HANDLERS
export const FETCHING_API_START = "FETCHING_API_LOADING";
export const FETCHING_API_SUCCESS = "FETCHING_API_SUCCESS";
export const FETCHING_API_FAILURE = "FETCHING_API_FAIL";
export const CREATE_RECIPE_START = "CREATE_RECIPE_START";
export const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";
export const CREATE_RECIPE_FAILURE = "CREATE_RECIPE_FAILURE";
export const UPDATE_RECIPE_START = "UPDATE_RECIPE_START";
export const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";
export const UPDATE_RECIPE_FAILURE = "UPDATE_RECIPE_FAILURE";
export const DELETE_RECIPE_START = "DELETE_RECIPE_START";
export const DELETE_RECIPE_SUCCESS = "DELETE_RECIPE_SUCCESS";
export const DELETE_RECIPE_FAILURE = "DELETE_RECIPE_FAILURE";
export const FETCH_USER_RECIPE_START = "FETCH_USER_RECIPE_START";
export const FETCH_USER_RECIPE_SUCCESS = "FETCH_USER_RECIPE_SUCCESS";
export const FETCH_USER_RECIPE_FAILURE = "FETCH_USER_RECIPE_FAILURE";
export const SEARCH_USER_RECIPE_START = "SEARCH_USER_RECIPE_START";
export const SEARCH_USER_RECIPE_SUCCESS = "SEARCH_USER_RECIPE_SUCCESS";
export const SEARCH_USER_RECIPE_FAILURE = "SEARCH_USER_RECIPE_FAILURE";
//FORM VALUES
export const UPDATE_RECIPE_VALUE = "UPDATE_RECIPE_VALUE";
export const DELETE_RECIPE_VALUE = "DELETE_RECIPE_VALUE";
export const SEARCH_RECIPE_VALUE = "SEARCH_RECIPE_VALUE";
export const SEARCH_VALUE = "SEARCH_VALUE";
export const FORM_VALUE = "FORM_VALUE";

//ACTIONS
export const searchValue = (newSearch) => {
  console.log("5. new searchValue from index.js", newSearch);
  return { type: SEARCH_VALUE, payload: newSearch };
};

export const recipeFormValues = (newForm) => {
  console.log("6. New recipeFormValues from index.js", newForm);
  return { type: FORM_VALUE, payload: newForm };
};

export const getRecipe = (props) => (dispatch) => {
  console.log("6. recipe props from actions", props);
  const options = {
    method: "GET",
    url:
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
    params: { query: props },
    headers: {
      "x-rapidapi-key": "b461d692bemshe80b4354ca6ba03p184f2ejsn08a3bb994638",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  console.log("API call is going");
  dispatch({ type: FETCHING_API_START });
  axios
    .request(options)
    .then((res) => {
      dispatch({ type: FETCHING_API_SUCCESS, payload: res.data.results });
    })
    .catch((error) => {
      dispatch({ type: FETCHING_API_FAILURE, payload: error });
      console.log("This API request failed", error);
    });
};

export const addRecipe = (props) => (dispatch) => {
  console.log("10. addRecipe props from addRecipe action", props);
  dispatch({ type: CREATE_RECIPE_START });
  // axiosWithAuth
  //   .post(
  //     "https://secret-family-recipes-101.herokuapp.com/api/recipes"
  //   )
  //   .then((res) => {
  //     dispatch({ type: CREATE_RECIPE_SUCCESS, payload: res.data.results });
  //   })
  //   .catch((error) => {
  //     dispatch({ type: CREATE_RECIPE_FAILURE, payload: error });
  //   });
};

export const updateRecipe = (props) => (dispatch) => {
  console.log("11. updateRecipe props from updateRecipe action", props);
  dispatch({ type: UPDATE_RECIPE_START });
  axiosWithAuth
    .put(`https://secret-family-recipes-101.herokuapp.com/api/recipes/:id`)
    .then((res) => {
      dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data.results });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_RECIPE_FAILURE, payload: error });
    });
};

export const deleteRecipe = (props) => (dispatch) => {
  console.log("12. deleteRecipe props from deleteRecipe action", props);
  dispatch({ type: DELETE_RECIPE_START });
  axiosWithAuth
    .delete("https://secret-family-recipes-101.herokuapp.com/api/recipes/:id")
    .then((res) => {
      dispatch({ type: DELETE_RECIPE_SUCCESS, payload: res.data.results });
    })
    .catch((error) => {
      dispatch({ type: DELETE_RECIPE_FAILURE, payload: error });
    });
};

export const getUserRecipes = (props) => (dispatch) => {
  console.log("13. getUserRecipes props from getUserRecipes action", props);
  dispatch({ type: FETCH_USER_RECIPE_START });
  axiosWithAuth
    .get("https://secret-family-recipes-101.herokuapp.com/api/recipes")
    .then((res) => {
      dispatch({ type: FETCH_USER_RECIPE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: FETCH_USER_RECIPE_FAILURE, payload: error });
    });
};

export const searchUserRecipe = (props) => (dispatch) => {
  console.log(
    "14. searchUserRecipes props from searchUserRecipes action",
    props
  );
  dispatch({ type: SEARCH_USER_RECIPE_START });
  axiosWithAuth
    .get(` https://secret-family-recipes-101.herokuapp.com/api/recipes/:id`)
    .then((res) => {
      dispatch({ type: SEARCH_USER_RECIPE_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: SEARCH_USER_RECIPE_FAILURE, payload: error });
    });
};
