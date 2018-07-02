import { put } from 'redux-saga/effects';
// we dont need to import this file becuase we no longer hard code action creators anymore.
// import * as actionTypes from '../actions/actionTypes';
// we import the actions from index so we can use the action creators in our sagas.
import * as actions from '../actions/index';

// CREATING A SAGA. SAGAS TAKE AN ACTION ARGUMENT.  THEY ARE REALATED TO ACTIONS.  we add a * that converts this function to a generator.  A generator is a function which can be executed incremetally.  we can puase during function execution. one line waits while the previous line finishes it's actions
//

// we are importing a generator helper function. it delays the exection of the next step.
import { delay } from 'reduc-saga';

// in a generator, we need to prepend each step we execute with the 'yield' keyword it means that each step will wait for the previous step to finish execution.

import axios from '../../axiosOrders';


export function* initIngredientsSaga (action) => {
  try {
    const response = yield axios.get('https://react-burgerbuilder-86f26.firebaseio.com/ingredients.json');
    yield put (action.setIngredients(response.data));
  } catch (error) {
    yield put(action.fetchIngredientsFail());
  }
}
