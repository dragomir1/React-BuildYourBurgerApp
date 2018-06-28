import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {Route, Switch} from 'react-router-dom';
import * as actions from './store/actions/index';

// this connects the app to the store so can dispatch from this container.
import { connect } from 'react-redux';

// THIS IS WHERE WE CHECK THE AUTENTICATION STATUS BECUASE THIS IS THE ROOT Component OF OUR APP NO MATTER WHICH ROUTE WE VISIT.  TO CHECK THIS, WE WILL NEED A NEW ACTION CREATER IN THE AUTH.JS FILE.






// WE ARE IMPORTING THE AUTH CONTAINER SO WE CAN LOAD IT IN ROUTING.  once we add it in routing  => see below, we need to go to the navigationItems.js file and add it as a link for users to navigate to.
import Auth from './containers/Auth/Auth';
class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }


  render() {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Switch>
        </Layout>


      </div>
    );
  }
}
// once we inport the action and dispatch the authCheckState from index. we need to execute this function in the componentDidMount hook.  which basically loads this component before the page is rendered.
mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default connect(null, mapDispatchToProps)(App);
