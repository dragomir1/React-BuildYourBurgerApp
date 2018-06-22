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
