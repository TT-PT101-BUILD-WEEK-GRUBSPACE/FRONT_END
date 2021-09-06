// file to store the action type constants
// please model actions as events rather than setters
// see documentation:
// https://redux.js.org/style-guide/style-guide#model-actions-as-events-not-setters
export const API_STATUS_CHANGE = "API_STATUS_CHANGE";

// user constants

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_CREATED = "USER_CREATED";
export const USER_RECIPES_RECEIVED = "USER_RECIPES_RECEIVED";
export const USER_RECIPE_ADDED_TO_LIST = "USER_RECIPE_ADDED_TO_LIST";
export const USER_RECIPE_REMOVED_FROM_LIST = "USER_RECIPE_REMOVED_FROM_LIST";
export const USER_AUTH_CHECKED = "USER_AUTH_CHECKED";

// item constants 
export const RECIPES_RECEIVED = "RECIPIES_RECEIVED";