import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// defining inital state
const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0,
  // we are setting error to false and will use this state property for our asych call in our burgerbuilding.js  in actions folder.  if we fail to load the ingredients.  we distpatch an action that loading failed.
  error: false,
  // HERE ARE ARE SETTING UP THE FOLLOWING: IF WE BUILD A BURGER BUT NOT AUTHICATED, AFTER WE BUILD IT AND WE SIGN UP WE ARE THEN REDIRECT TO CHECKOUT PAGE FROM THE AUTHENTICTE PAGE SO WE CAN CONTINUE WITH OUR ORDER. this sets the building to false initally.

  // WE CAN USE THIS PORPOTERY IN THE AUTH CONTAINER TO CHANGE THE REDIRECT PATH BACK IF WE THINK THE USER IS NOT BUILDING A BURGER ANYMORE.
  building: false
};

// globally scoped.
const INGREDIENT_PRICES = {
  lettuce: .5,
  cheese: .75,
  meat: 1.5,
  bacon: 1,
};

// this creates a deep clone
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients
      //   }
      // };
 // in ...state.ingredients, we need to override the given ingedient which we need to get as a payload of this action
 // [action.ingredientName] ingredientName is something we get as a payload to that action. [action.ingredientName] once of these ingredients, which ever that is when recieved as a payload to the action, will recieve a new value. we target it with this specific syntax,
 // [action.ingredientName]: state.ingredients[action.ingredientName] + 1 == we get the number of the old ingedients, add one and assign it to the key [action.ingredientName] where we override the copy we created at ...state.ingredients
 // now we are returning a new version of the state with the updated ingredients
const reducer = (state = initialState, action) => {
  {/*YOU ALWAYS NEED A TYPE ON YOUR ACTION PROPERTY.*/}
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          {/*distributing all porppoerties of state ingredients IMMUTABLY.  this is deep cloning*/}
          ...state.ingredients,
          {/*the [] syntax dynamically overides a given property in a js object.
            [action.ingredientName] gets the property name on the action.  ingredientName is something we get as a paylod to the action. which ever ingredient that is, will recive a new value.*/}
            {/*code below is we get the number of the old ingedient, add 1 and assign it to the the ingredient property name where we then override the copy we created in ...state.ingredient*/}
            {/*now we return a new version of the state with the updated ingredients.*/}
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        {/*this is how we manipulate and update the price.*/}
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        // we are setting this to indicate that we are working on the burger.
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
          // we are setting this to indicate that we are working on the burger.
          building: true

        };
        // this code is executed when we get ingredients from the server.  so this is part of the asych code...we first wait to get the ingredients before we dispatch an action.
    case actionTypes.SET_INGREDIENTS:
    return {
      ...state,
      // in the burgerBuilder action file we pass the ingredients property. so we initialize or set the ingredients. THIS UPDATE THE INGREDIENTS.
      ingredients: action.ingredients
      // THIS CODE IS HARDCODED IN TO MANALLY CHANGE THE ORDER OF OUR INGREDIENTS.  WE ARE MAPPING THIS MANUALLY.
      // ingredients: {
      //   lettuce: action.ingredients.lettuce,
      //   bacon: action.ingredients.bacon,
      //   cheese: action.ingredients.cheese,
      //   meat: action.ingredients.meat
      },

      // when we call SET_INGREDIENTS we need to set the error in case we had the error earlier and now we dont
      error: false,
      // WE NEED TO RESET THE PRICE ONCE WE ARE DONE ORDERING THE BURGER.
      totalPrice: 0,
      // setting this to false becuase we are not building yet.  we reloaded the page.
      building: false
    // this is part of the fail action creator.
    case actionTypes.FETCH_INGREDIENTS_FAIL:
    return {
      ...state,
      error: true
    };
    default:
      return state;
  }
};

export default reducer;
