import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
// we need to import withRouter in order for connect to work. otherwise it will break the router.  we then need to wrap it at the bottom when we export.
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import * as actions from './store/actions/index';

// this connects the app to the store so can dispatch from this container.
// ***if we use this in this file it will break the router,  in order to use connect,
// we need to import something else.
import { connect } from 'react-redux';

// THIS IS WHERE WE CHECK THE AUTENTICATION STATUS BECUASE THIS IS THE ROOT Component OF OUR APP NO MATTER WHICH ROUTE WE VISIT.  TO CHECK THIS, WE WILL NEED A NEW ACTION CREATER IN THE AUTH.JS FILE.






// WE ARE IMPORTING THE AUTH CONTAINER SO WE CAN LOAD IT IN ROUTING.  once we add it in routing  => see below, we need to go to the navigationItems.js file and add it as a link for users to navigate to.
import Auth from './containers/Auth/Auth';
class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  // THIS CODE SETS IT UP THAT IF YOU'RE LOGGED OUT, YOU CANT VISIT THE ORDERS PAGE.  WE ARE GUARDING THE ORDERS PAGE.

  render() {
    // this is the routing setup for unauthenticated users.
    let routes = (
      <Switch>
        <Route path="/" component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    // this is the routing setup for authenticated users.
    if(this.props.isAuthenticated) {
        routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
        );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
// this access our state.  we are setting it up so that the orders page can only be visited when we are logged in.
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}
// once we inport the action and dispatch the authCheckState from index. we need to execute this function in the componentDidMount hook.  which basically loads this component before the page is rendered.
mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}
// withRouter will enforce your props being passed down to the app component. you use this funcion when you use connect.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
