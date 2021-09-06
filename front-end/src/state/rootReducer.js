import { combineReducers } from "redux";
import { apiReducer } from "./api/api";
import {recipesReducer} from "./recipes/recipes";
import {userReducer} from "./user/user";
export const rootReducer = combineReducers({
   api: apiReducer,
   user: userReducer,
   recipes: recipesReducer
});