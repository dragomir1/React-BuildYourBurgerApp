import * as actionTypes from '../actions/actionTypes';
import axios from '../../axiosOrders';
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

export function* purchaseBurgerSaga(action) => {
  yield put(action.purchaseBurgerStart());
  try {
    // we need to excract the agruments we recieve from the action.
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
      // response.data.name - .name is the specific property we are extracting.  response.data extracts everything as is. but if we want to be more specific and fetch specific propeties, we need to add additional properties at the end of it => response.data.name
      yield put (action.purchaseBurgerSuccess(response.data.name, action.orderData))
  } catch (error) {
    yield put (action.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga (action) => {
  // we need to dispatch fetchOrdersStart to set loading to true.  the loading prop is in the orders reducer
  yield put (action.fetchOrdersStart());
  // we are setting up code to fetch specific user data '&orderBy' is a query parameter understood by firebase. this orders the data but this also tells firebase to filter by it
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
try {
  // this is where we add the token we got back from firebase when authenticating.
  // we are adding code that will give us access to protected resources once we are authenticated and have a token.
  // we need to recieve the token which is stored in our auth reducer. we can do this by recieving the 'getstate' function in addition to the dispatch function.  getstate function will give us access to the state in the reducer file.
  const response = yield axios.get('/orders.json' + action.queryParams);
  //  WE ARE TRANSFORMING DATE WE ARE GETTING BACK.  THIS DOESN'T GO IN THE REDUCER BECUASE IF YOU EVER CHANGE THE BACK END DATA FORMAT, YOU NEED TO CHANGE THE DATA FORMAT IN THE REDUCER.  REDUCER IS WHAT UPDATES THE STATE. HERE WE GET THE DATA IN THE FORMAT WE WANT TO STORE IT IN.
  const fetchedOrders = [];
  for( let key in response.data) {
    fetchedOrders.push({
      ...response.data[key],
      id: key
    });
  }
  yield put (actions.fetchOrdersSuccess(fetchedOrders))
} catch (error) {
  yield put(actions.fetchOrdersFail(error))
}
}
