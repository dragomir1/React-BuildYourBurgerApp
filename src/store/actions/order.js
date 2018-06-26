import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';


// this file is where we create our our actions creators.
// THIS IS THE BURGER SUCCESS ACTION CRTEATOR. WE PASS THE ID OF THE NEWLY CRAETED ORDER AS WELL AS THE DATA OF WHAT WAS ORDERED. WE WANT TO PASS THE ID IN THE ACTION CREATED. SO THAT IN THE REDUCER WE CAN ADD THAT ACTION TO ADD THE ORDER THE ORDERS ARRAY.
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData

    };
};
// THIS IS THE FAIL ACTION CREATOR.
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

// this action creator is used internally only. THIS IS WHAT SETS LOADING TO TRUE ONCE WE START FETCHING AN ORDER.
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};


// THIS IS THE ACTION WE DISPATCH FROM THE CONTAINER ONCE WE CLICK THAT ORDER BUTTON. THIS IS A THE ASYCH CODE.
// once we get the response so that we're successful.  we dispatch purchaseBurgerSuccess action creator
// before we send the post request, we need to execute the purchaseBurgerStart function. this will dispatch the action.

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    // BEFORE WE SEND THE POST REQUEST TO THE SERVER. WE WANT TO EXECUTE purchaseBurgerStart RIGHT AWAY TO DISPATCH THE ACTION.  WE WRAP IT IN A DISPATCH SO THAT THE ACTION RETURNED WHEN THE FUNCTION IS EXECUTED IS distpatchED TO THE THE STORE.
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
    .then(response => {
      console.log(response.data)
      // response.data.name - .name is the specific property we are extracting.  response.data extracts everything as is. but if we want to be more specific and fetch specific propeties, we need to add additional properties at the end of it => response.data.name
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error))
    })
  };
};

// AFTER WE CREATE AN ACTIONTYPE, WE CREATE AN actionCreator.  THEN WE NEED TO EXPORT IT TO THE INDEX.JS FILE.  // ONCE WE EXPORT PURCHASE_INIT, WE GO TO OUR Checkout CONTAINER AND LOAD IT IN componentDidMount.
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};


// THIS IS THE ORDERS ACTION CREATORS.  WE HAVE THE INITIAL ORDER THAT WILL TAKE US THROUGH THE ORDER PROCESS. WHERE WE SET LOADING TO TRUE AND THEN TRIGGER THE STARTING PROCESS WHERE WE REACH OUT TO THE WEB AND THEN WE HAVE THE SUCCESS CASE OR THE FAIL CASE.
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};
// THIS IS FOR INTERNAL ONLY. THIS HELPER FUNCTION PREVENTS AN INFINITE LOOOP.
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

// this runs the asynch code. this is in the middle of actions and the reducers.
// we're getting the orders so we don't need an argument.

//once this is complete, we need to handle the action types in the reducer as well.
// we now need to pass this token to our Orders container.
export const fetchOrders = (token) => {
  // in order to recieve data from the reducer, we need to recieve the getState function in addition to the dispatch function. note: we are not doing this.  this is an FYI for down the road.
  return dispatch => {
    // we need to dispatch fetchOrdersStart to set loading to true.  the loading prop is in the orders reducer
    dispatch(fetchOrdersStart());
    // this is where we add the token we got back from firebase when authenticating.
    // we are adding code that will give us access to protected resources once we are authenticated and have a token.
    // we need to recieve the token which is stored in our auth reducer. we can do this by recieving the 'getstate' function in addition to the dispatch function.  getstate function will give us access to the state in the reducer file.
    axios.get('/orders.json?auth=' + token)
    .then(res => {
      //  WE ARE TRANSFORMING DATE WE ARE GETTING BACK.  THIS DOESN'T GO IN THE REDUCER BECUASE IF YOU EVER CHANGE THE BACK END DATA FORMAT, YOU NEED TO CHANGE THE DATA FORMAT IN THE REDUCER.  REDUCER IS WHAT UPDATES THE STATE. HERE WE GET THE DATA IN THE FORMAT WE WANT TO STORE IT IN.
      const fetchedOrders = [];
      for( let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders);
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error));
    });
  }
}
