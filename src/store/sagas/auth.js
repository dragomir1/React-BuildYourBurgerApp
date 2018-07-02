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

// we are importing a generator helper function. it delays the exection of the next step.
import { delay } from 'reduc-saga';

// in a generator, we need to prepend each step we execute with the 'yield' keyword it means that each step will wait for the previous step to finish execution.

import axios from 'axios';


export function* logoutSaga (action) => {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put acts like 'return'.  so it will dispath the action once execution of previous steps are finished.

  // we execute this action creator that we import from action index, which was imported from auth action file.
  yield put (actions.logoutSucceed());
};

// WE ARE DEALING WITH THE checkAuthTimeout FUNCTION IN THE AUTH ACTION FILE.
// we need to import a helper function that will help us with the asynch code. look at the top.
// WE ALSO NEED TO IMPORT THIS IN THE INDEX SAGA FILE.
export function* checkAuthTimeoutSaga (action) => {
  yield delay(action.expirationTime * 1000);
  yield put( actions.logout());
}


// we are adding the auth action function in a saga.
// 1. creating the generator function.

export function* authUserSaga (action) => {
  // need to make sure authStart in is the index action file so we can import it. we want to reach out to our authstart action and get the action this dispatches.
  yield put(action.authStart());
  // dispatch(authStart());
  // creating auth Data.  we need to create an object and pass several properties
  // we need to pass the authData object as a second argument to axios when submitting a request.
  const authData = {
    // we are extracting email and password from the action.
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  // we are setting the default URL.
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[AIzaSuJ5jKD6X35tTe-l34vBNIqWxgKSHFk3glY]';
// getting this on the action we pass.
  if(!action.isSignUp) {
    // setting to the other url if they are signing in.
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[AIzaSuJ5jKD6X35tTe-l34vBNIqWxgKSHFk3glY]';
  }
  // we pass the url.
  // Here we post our auth request and get back a response.  we need to pass along that response to our AUTH_SUCCESS function.  becuase AUTH_SUCCESS needs to passit on as well. otherwise we are not really doing anything with the data we extracted.


  // WE NEED TO CHANGE THE WAY WE USE THE PROMISE THE POST RETURNS TO US. this is how we'll do it:
  // by doing this, this will not return a promise anymore. but wait for this promise to resolve or reject and then return the result and store it in this constant.  so we no longer need .then and .catch

  try {
  const response = yield axios.post(url, authData)
  // axios gives us a promise.
  // WE NEED TO PASS THE DATA EXTRACTED TO UATH SUCCESS.


      // we need to pass the idToken and userId everythime we dispatch the authSuccess function.
      // the 'localId' prop is in the console.log in the returned data.

      // IF WE RELOAD THE PAGE WE LOST EVERYTHING BECAUSE REACT DOWNLOADS THE APPLICATAION AGAIN AND EXECTUES JS AGAIN..IT'S A NEW APP.
      // WE NEED TO PERSIST OUR LOGIN STATE ACROSS OUR SESSIONS.
      // TO PERSIST THE STATE REQUIRES A BROWSER API CALLED LOCALSTORAGE.  THE LOCALSTORAGE API IS BAKED INTO THE BROWSER SO WE CAN EASILY USE IT.
      // WE PUT IT HERE BEUCASE WE ARE WORKING WITH THE TOKEN AS WELL AS THE expirationTime.
      // the 'setitem' method stores the item in localStorage. it takes two arguments. the first one is the key so we can fetch it. and the second one is the actual item
    yield localStorage.setItem('token', response.data.idToken);
    // this is how we get the time.
    // we are settting up and storing expirationDate in localStorage whnever we acquire a token.
    const expirationDate = yield new Date(Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('expirationDate', expirationDate);
      // the 'localId' prop is in the console.log in the returned data.
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    // we are dispatch this function when we get back a succes response.  the 'expiresIn' property is in the console on chrome.
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
// WE USE A TRY / CATCH BLOCK WHEN IT COMES TO DEALING WITH THE CATCH.  IT'S A MORE ELEGANT WAY.
    yield put (actions.authFail(error.response.data.error));
  }
}

// i copied all the code from the auth action and now replacing it step by step.
// ONCE IT'S DONE WE WANT TO HOO IT UP AND MAKE SURE IT GETS EXECUTED AT THE TIME OF APPLICATION.
// GO BACK TO ACTION AUTH AND DELETE THE THIS LOGIC THAT IS NOW IN SAGA.  WE ARE GOING TO RETURN AN ACTION TYPE.
export function* authCheckStateSaga (action) => {
  const token = yield localStorage.getItem('token');
  if(!token) {
    yield put(actions.logout());
  } else {
    const expirationTime = yield new Date(localStorage.getItem('expirationDate'));
    if(expirationDate < new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      // the amount of seconds until we should be logged out. this code says:
      // this is passing the difference between the future date in seconds and the current date in seconds.  the difference is the expiring time in milli-seconds.
      yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
      }
  }
}
