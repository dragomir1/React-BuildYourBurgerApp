import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0,
}

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
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          }
        };
    default:
      return state;
  }
};

export default reducer;
