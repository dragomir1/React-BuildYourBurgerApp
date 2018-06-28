import React, { Component } from 'react';
import Order from '../../components/Order/Order';
// YOU NEED AXIOS IF YOU'RE GOING TO FETCH DATA...
import axios from '../../axiosOrders';

// WE ARE FETCHING ALL THE ORDERS FROM THE DATABASE. USEING COMPONENTDIDMOUNT.

// WHEN WE FETCH THE DATA AND PUSH TO THE ARRAY, WE NEED TO HANDLE ERRORS.  SO WE NEED TO IMPORT THE ERROR HANDLER HOC. once we import, we need to wrap our orders component at the export level.
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';

//   THIS FOR FETCHED ORDERS./////
// we import the action creators.
import * as actionCreators from '../../store/actions/index';
// we also need to connect to the STORE
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
// USING REDUX NOW.
  // state = {
  //   orders: [],
  //   loading: true
  // }

// YOU USE THIS TO ONLY FETCH ORDERS WHEN THE COMPONENT IS LOADED.
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    //  WE ARE USING REDUX NOW.  THIS LOGC MOVES TO THE ORDERS ACTION.
    // // once you get data you want to do something with the response.  we want to set some state that contains the orders so it can then be outputted.
    // axios.get('/orders.json')
    // .then(res => {
    //   // THE DATA COMES BACK AS AN OBJECT NOT AN ARRAY.  WE NEED TO CONVERT THAT TO AN ARRAY.  WE USE A FOR IN LOOP.
    //   // this is a helper method.
    //   const fetchedOrders = [];
    //   for( let key in res.data) {
    //     // you push the data for a given key.
    //     // to prevent losing the ids which are the keys, when you push to the array, yo uneed to push a new object to the array
    //     fetchedOrders.push({
    //       // we distribute the propteries of the object we fetched.
    //       // we need to add an id property with a value of key.  this will put the data but also retain the keys
    //       ...res.data[key],
    //       id: key
    //     });
    //   }
    //   this.setState({loading: false,  orders: fetchedOrders});
    // })
    // .catch(err => {
    //   this.setState({loading: false});
    // });
  }

// NOW THAT WE FECTHCED THE THE ORDERS WE ARE GOING TO LOOP THROUGH THEM AND OUTPUT THEM.
// we set a spinner here...the default orders is the spinner. if it's not loading then show the order. else if it is loading, show the spinner.  we need to return to render the orders variable.
  render () {
    let orders = <Spinner />;
    if(!this.props.loading) {
      orders = this.props.orders.map(order => (
          <Order
            key={order.key}
            ingredients={order.ingredients}
            price={order.price} />
      ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    // we need to get the token that we passed to dispatch.  we are now making the token avail on the token prop and we can pass it along.
    token: state.auth.token,
    // we are pasing this so that we can get this prop to fetch specific user data from the server.
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // we are passing the token from our orders action.
    // we are passing userid from orders action to get speciic user data.
    onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId));
  }
}
//  we need to pass axios, otherwise it won't work.
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
