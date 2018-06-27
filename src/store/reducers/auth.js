// this file will store our token.
 // This will handle all the auth actions and the auth state.

// need to import types for the switchcase statement
 import * as actionTypes from '../actions/actionTypes';
 import { updateObject } from '../utility';


 const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false,
   // adding property redirecting to the root.  this is for dynamic insertion. in order for us to be able to change this we need to register a new action.
   authRedirectPath: '/',

 }

// creating a new reducer to set the path dynamically. add it as a case to the reducer at the bottom.
 const setAuthRedirectPath = (state, action) => {
   // we are dispatching the path property on the action. we are given the path proptery on the auth actions file.
   return updateObject(state, { authRedirectPath: action.path});
 }

// created a new reducer function to utilize it with our utility helper function.
const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

// for the success we are changing everything in the state.
// get this property on the action.
// WE EXRACT THE IDTOKEN AND USERID from the action file but we need to pass this data along.  CURRENTLY, WE ARE NOT REALY PASSING ON THAT DATA IN THE AUTH ACTION FILE.

const authSuccess = (state, action) => {
  return updateObject(state, {
      token: action.token,
      userId: action.userId,
      error: null,
      // set this to false becuase we're done.
      loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

// this is a new reducer to reset the logout state after the time expired.
const authLogout = (state, action) => {
    return updateObject(state, {
      token: null,
      userId: null
    });
};

// ONCE WE ARE DONE HERE WE NEED TO COMBINE THE REDUCERS => GO TO THE INDEX.JS FILE.
// when this function gets exectued, we return the updated path.
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
      case actionTypes.AUTH_START: return authStart(state, action);
      case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
      case actionTypes.AUTH_FAIL: return authFail(state, action);
      case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
      default:
      return state;
    }
}


export default reducer;
