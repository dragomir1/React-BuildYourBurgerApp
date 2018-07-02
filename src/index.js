import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
// imort applyMiddleware - this will allow us to use the thunk middleware
// importing the store function from the redux package we installed.  we need to mount the app as well.
// combineReducers combines multiple reducers into one. this is a function which takes a js object, mapping our reducers to different slices of our state, as input and merges everything into one state and one reducer.
// applyMiddleware allows us to add middleware to the store
// compose allows us to combine enhancers.  this is the native redux soloution.  it doesn' give us dev tools.
// when using dev tools, you need to import compose.
// combineReducers combines all the reducers.
// when we import thunk and applyMiddleware.  we need to import compose for our DEV TOOLS.  if DEV TOOLS isn't avail.  it will default to compose which is the native redux soloution.
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// Provider acts as a dependency container that holds the store and makes it available for the connect
import { Provider } from 'react-redux';

// import the thunk middleware...thunk is used with applyMiddleware.  so we need to impor applyMiddleware from redux.
import thunk from 'redux-thunk';

// to combine reducers, we need to import both files.
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

// this registers the saga and makes the store aware of it and that it's able to use.
import createSagaMiddleware from 'redux-saga';
// we also need to inport the saga we created.
import { watchAuth } from './store/sagas/index';

// we are executing the createSagaMiddleware function and storing it in a var.
const sagaMiddleware = createSagaMiddleware();

// this sets up the redux devtools store in the browser. this goes before the store is created.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// THIS CONST COMBINES BOTH REDUCERS INTO ONE JS OBJECT.  WE THEN PASS IT TO createStore.  THIS APP WILL BREAK  BECUASE WE HAVE DIFFERENT SLICES OF STATE => burgerBuilder AND order.  WE NEED TO UPDATE THIS IN THE CONTAINER THAT UTILIZES THESE REDUCERS.
// THIS IS THE GLOBAL ROOT REDUCER.
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,

});
// the second argument sets up our redux dev tools.
// const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// ONCE WE IMPORT THE PROVIDER, CREATESTORE dependencIES, WE THEN CREATE OUR STORE.
// we are adding a second argument, applyMiddleware and passing thunk, which allows for asynch code.  THis sets us up for asynch code.
//  WE ARE ADDING THE sagaMiddleware CONST TO OUR STORE AS WELL.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

// AFTER WE DO THAT WE CAN USE THE SAGAMIDDLEWARE AND RUN A SAGA.  we need to pass it the action creator function.
sagaMiddleware.run(watchAuth);

// IF YOU ARE GOING TO CREATE ANOTHER SAGA, YOU NEED TO IMPORT ABOVE THEN CREATE A SEPERATE EXECTUION.
// sagaMiddleware.run(watchAuth);




// AFTER STORE IS CREATED WE SET THE STORE PROPERTY ON THE PROVIDER AND PASS IT THE STORE.
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
