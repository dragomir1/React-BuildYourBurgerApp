// This allows us to listen to certain actions and do something when they occur.

// takeEvery takes two arguments. the first one is the action we are listening for.  the second is the generator we want to execute when this action occurs.
import { takeEvery } from './redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga,
         checkAuthTimeoutSaga,
         authCheckStateSaga
       } from './auth';

import { initIngredientsSaga } from './burgerBuilder'


// in generators, we have to use the yeild keyword...which says 'execute this and wait for it to finish'.
// we need to pass the action creator we are listening for.

// takeEvery takes two arguments. the first one is the action we are listening for.  the second is the generator we want to execute when this action occurs. don't execute the logoutSaga function.  just pass a reference to it.

// whenever we execute this generator, we set up a listener, in this case listen for AUTH_INITIATE_LOGOUT, and execute logoutSaga whenever it appears.  we need to import it in the index file.
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  // don't forget to import.
  yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
  //  we need to import the saga.
  // we also need to go back to burgerbuilder actions, delete the logic and return a new Action creator.
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga;)
}
