// ****** SAGAS - WHICH ARE KIND'VE FUNCTIONS WITH A LITTLE TWIST.  THEY WHICH YOU RUN APON CERTAIN ACTIONS AND HANDLE ALL YOUR SIDE-EFFECT LOGIC.
    // SIDE EFFECT LOGIC COULD BE ACCESING LOCAL STORAGE, REACHING OUT TO A SERVER, CHANGING A ROUTE OR EXECUTING A TIMEOUT.
    //  THESE ARE ALL SIDE EFFECTS BEUCASE THEY DON'T DIRECTLY MANIPULATE YOUR REDUX STORE.  THEY MIGHT DO SOMETHING WHICH LEADS TO A DIFFERENT STATE THAT IS THEN STORED IN YOUR STORE, BUT THEY ARE NOT DIRECTLY CONSUMED BY THE REDUCER.

    // SAGAS ARE RELATED TO ACTIONS.
    //*******


    // TO HOOK UP THE SAGAS TO OUR STORE WE NEED TO DO IT IN THE INDEX.JS FILE

// we import the put function which basically acts like a return.  so when you use put, you are returning data.
import { put } from 'redux-saga/effects';
// we dont need to import this file becuase we no longer hard code action creators anymore.
// import * as actionTypes from '../actions/actionTypes';
// we import the actions from index so we can use the action creators in our sagas.
import * as actions from '../actions/index';

// CREATING A SAGA. SAGAS TAKE AN ACTION ARGUMENT.  THEY ARE REALATED TO ACTIONS.  we add a * that converts this function to a generator.  A generator is a function which can be executed incremetally.  we can puase during function execution. one line waits while the previous line finishes it's actions
//

// in a generator, we need to prepend each step we execute with the 'yield' keyword it means that each step will wait for the previous step to finish execution.

export function* logoutSaga (action) => {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put acts like 'return'.  so it will dispath the action once execution of previous steps are finished.

  // we execute this action creator that we import from action index, which was imported from auth action file.
  yield put (actions.logoutSucceed());
};
