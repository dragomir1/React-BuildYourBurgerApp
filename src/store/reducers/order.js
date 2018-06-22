// This file manages the order state throught the reducers.
// we import our actionstypes.
import * as actionTypes from '../actions/actionTypes';
// set the initial state of our reducer. so we essentially start clean.

const initialState = {
  // WE NEED TO HAVE ALL THE ORDERS.
  orders: [],
  // THIS PROPS TELLS US IF WE'RE IN THE PROCESS OF ORDERING OR IF WE'RE DONE.
  // THE PROBLEM IS THAT IN THE ORDER ACTION CREATOR, WE DISPATCH SOME ACTIONS THAT DOESN'T CATCH IN REDUX THEREFORE IT WILL NOT UPDATE THE LOADING PROPERTY STATE WHEN WE START LOADING. SO WE'LL NEED TO ADD ANOTHER ACTION TO DISPATCH.
  loading: false,
  purchased: false

}

// this is our reducer containing switch cases. Concat returns a new array and adds it to the old state immutabely.
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
    return {
      ...state,
      // this is the inital setting before we redirect. if this is false we dont redirect. only upon success this turns true.
      // this will always be false everytime we land on the checkout container.
      purchased: false

    }
    // ONCE WE CONNECT OUR ACTION TO THE STORE, WE CAN HANDLE THE PURCHASE_BURGER_START CASE TO SET THE LOADING TO TRUE.
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        // we set this to true we're fetching an order.  once this is done we need to go back to our contact data container and make sure we add the loading property to mapStateToProps.
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
    // UPON SUCCESS, WE WANT TO STORE THE ORDER IN THE ORDERS ARRAY. AND SET LOADING TO FALSE BECUASE WE'RE DONE
    // THIS ORDER IS THE ORDER WE RECEIVE FROM THE ORDER.JS IN THE ACTIONS FOLDER. IN THE PURCHASE_BURGER_SUCCESS, WE GET THE ORDERID AND THE ORDERDATA. WE NEED TO MERGE BOTH PROPERTIES INTO ONE OBJECT. WE CREATE A NEWORDER CONST WITH AN OBJECT.
    const newOrder = {
      // we are spreading out all the properties of the order data THAT wAS ALSO passed on to server.
      // THIS CREATES A NEW ORDER WHICH WE PASS TO THE CONCAT METHOD.
      ...action.orderData,
      id: action.orderId,
    }
      return {
        ...state,
        loading: false,
        // here it changes to true once we successfully purchased our burger. but is always reset to false when we revisit the checkout container.
        purchased: true,
        // CONCAT RETURNS A NEW ARRAY IMMUTABLY
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        // WE SET LOADING TO FALSE BECUASE EVEN IF IT FAILS, WE'RE STLL DONE.
        loading: false
      };


      //ONCE DONE HERE NEED TO EXPRT THEM TO THE INDEX.JS
      case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
      case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        // we are adding the orders to our orders array.  'orders: action.orders' is saying that orders is now action.orders.  which is the name of the propety that we are getting from our action orders action creators.  we are dispatching "fetchOrdersSuccess" that has an orders argument and a setting a proptery to hold the orders data.
        //  DON'T FORGET TO CHECK IF THE ACTION CREATORS HAVE PROPERIES ATTACHED TO THEM TO BE PASSED ON HERE....we are extracting the orders poepoerty from our action creator and storing it in the array. in this case the orders are in an array format. check out the action orders.
        orders: action.orders,
        loading: false
      };
      case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        // WE SET LOADING TO FALSE BECUASE EVEN IF IT FAILS, WE'RE STLL DONE.
        loading: false
      };
    default:
        return state;
  }
};

export default orderReducer;
