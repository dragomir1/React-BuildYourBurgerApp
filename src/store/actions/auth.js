// this is where we set up authentication related action creators.
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};


// here we are storing the data recieved from the response we get after we make the axios url request.  We then need to pass this data as props which we then extract in the reducer.

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

// if the token expires after a set time, that token will no loger exist. so if you are logged in and the token expires, you're in a akward space. so we need to update the UI that we are logged out after the token expires.
// invalid the the token after one hour, then upate the UI once the token is no longer there
// we are running asynch code here...
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {

  };
};



// this is the asynch function.
// THIS IS THE REACT SIDE OF SENDING A POST REQUEST AND GETTING A TOKEN FROM BACK END.

// WE NEED  THIRD ARGUMENT. TO ADDRESS IF ITS SIGNUP OR SIGNIN. AND SEND THEM TO ITS RELEVANT ENDPOINTS => sending the request to different URLS to different methods.
export const auth = (email, password, isSignUp) => {
  return dispatch  => {
    dispatch(authStart());
    // creating auth Data.  we need to create an object and pass several properties
    // we need to pass the authData object as a second argument to axios when submitting a request.
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    // we are setting the default URL.
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[AIzaSuJ5jKD6X35tTe-l34vBNIqWxgKSHFk3glY]';

    if(!isSignUp) {
      // setting to the other url if they are signing in.
      let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[AIzaSuJ5jKD6X35tTe-l34vBNIqWxgKSHFk3glY]';
    }
    // we pass the url.
    // Here we post our auth request and get back a response.  we need to pass along that response to our AUTH_SUCCESS function.  becuase AUTH_SUCCESS needs to passit on as well. otherwise we are not really doing anything with the data we extracted.
    axios.post(url, authData)
    // axios gives us a promise.
    // WE NEED TO PASS THE DATA EXTRACTED TO UATH SUCCESS.
    .then(response => {
      console.log(response
        // we need to pass the idToken and userId everythime we dispatch the authSuccess function.
        // the 'localId' prop is in the console.log in the returned data.
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      // we are dispatch this function when we get back a succes response.  the 'expiresIn' property is in the console on chrome.
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      console.log(err);
      // we can access the error message we get back from fire base on this err object by accessing the original response

      dispatch(authFail(err.response.data.error));
    });
  };
};

// ONCE DONE WE NEED TO CONNECT OUR ACTIONS TO OUR AUTH.JS CONTAINER. BEFORE WE DO THAT WE NEED TO ADD THESE ACTION CREATORS TO THE INDEX.
