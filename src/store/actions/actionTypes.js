export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
// this action type is to dispatch an error action. we set error state to false in burgerBuilder in reducer folder.  then we set it in the burgerBuilder actions folder.
export const FETCH_INGREDIENTS_FAIL = 'FETCH_INGREDIENTS_FAIL';

// adding order actions. WE WANT SEVERAL ACTION TYPES WHEN WE PLACE AN ORDER FOR OUR BURGER.  WE WANT THE SUCESS AND FAIL ACTIONS TYPES.
//THIS SETS LOADING TO TRUE WHEN WE START FETCHING A BURGER.
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';



// this actionType will be dispatched whenever we load the check out page.
// THIS IS ALSO ACTIONTYPE IS FOR REDIRECTING ONCE WE PLACE AN ORDER.
export const PURCHASE_INIT = 'PURCHASE_INIT';

// actionType for getting an order. once we create the actionTypes, we create the action creators in the order.js file.
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';


// authentication actionTypes
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

// this action creator is the step before the logout..this is being used in sagas.
export const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';

export const AUTH_CHECK_INITIAL_STATE = 'AUTH_CHECK_INITIAL_STATE';
export const INIT_INGREDIENTS = 'INIT_INGREDIENTS';

// adding a new action type for the checkAuthTimeoutSaga generator.  now we dispathc this action in the auth action file.
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const AUTH_USER = 'AUTH_USER';

//  this actiontype is to dynamcially change the path depending on user authntication.  we now need to add a new action creator in our auth file.
export const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';
