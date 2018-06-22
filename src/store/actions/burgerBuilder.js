
// import actiontypes file.
import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';


// this file is where we create our our actions creators.
// we pass an argument and include the ingredientName proptery which is passed as a payload in our burgerBuilder container => our mapDispatchToProps function.
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};



// we set an internal utility action creator function that will be dispatched during our asych code if our ingredients fail to load.  we craeted an action type in the actionType file.
export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  }
};


//  this is the action creator to be used with our initIngredients action creator which loads the ingredients. we want to return an action to dispatch.  for that you, need an action type which needs to be set in the actionTypes.js file.  this function is only used internally.
// SET_INGREDIENTS is the action type that needs to be added in actionTypes.js file.

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

// created a new const that will make a request to the server. we are fetching the ingredients.  This loads the ingredients initially.
//the dispatch allows you to execute asynch code and dispatch a new action whenever you're done with the code..so we dispatch and get a request, then..execute a new action when done.  so you need a second action creator that is used internally in this file only.  The setIngredients action creator.

//added a new actionTypes for check if ingredients loading failed. then we add it to our catch method

// the dispatch function is available due to redux-thunk.
// we want to dispatch the setIngredients funtion once the asych code is done.
//DONT FORGET THAT WE NEED TO DISPATCH THIS ACTION IN THE BurgerBuilder FILE IN OUR CTONTAINER
export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-burgerbuilder-86f26.firebaseio.com/ingredients.json')
    .then( response => {
      dispatch(setIngredients(response.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFail());
    })
  };
};
