// ****** SAGAS - WHICH ARE KIND'VE FUNCTIONS WITH A LITTLE TWIST.  THEY WHICH YOU RUN APON CERTAIN ACTIONS AND HANDLE ALL YOUR SIDE-EFFECT LOGIC.
    // SIDE EFFECT LOGIC COULD BE ACCESING LOCAL STORAGE, REACHING OUT TO A SERVER, CHANGING A ROUTE OR EXECUTING A TIMEOUT.
    //  THESE ARE ALL SIDE EFFECTS BEUCASE THEY DON'T DIRECTLY MANIPULATE YOUR REDUX STORE.  THEY MIGHT DO SOMETHING WHICH LEADS TO A DIFFERENT STATE THAT IS THEN STORED IN YOUR STORE, BUT THEY ARE NOT DIRECTLY CONSUMED BY THE REDUCER.

    // SAGAS ARE RELATED TO ACTIONS.
    //*******


    // TO HOOK UP THE SAGAS TO OUR STORE WE NEED TO DO IT IN THE INDEX.JS FILE

// we import the put function which basically acts like a return.  so when you use put, you are returning data.
import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

// CREATING A SAGA. SAGAS TAKE AN ACTION ARGUMENT.  THEY ARE REALATED TO ACTIONS.  we add a * that converts this function to a generator.  A generator is a function which can be executed incremetally.  we can puase during function execution. one line waits while the previous line finishes it's actions
//

// in a generator, we need to prepend each step we execute with the 'yield' keyword it means that each step will wait for the previous step to finish execution.

export function* logoutSaga (action) => {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put acts like 'return'.  so it will dispath the action once execution of previous steps are finished.
  yield put ({
    type: actionTypes.AUTH_LOGOUT,
  });
}
