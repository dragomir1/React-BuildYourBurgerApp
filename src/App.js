import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch} from 'react-router-dom';

// WE ARE IMPORTING THE AUTH CONTAINER SO WE CAN LOAD IT IN ROUTING.  once we add it in routing  => see below, we need to go to the navigationItems.js file and add it as a link for users to navigate to.
import Auth from './containers/Auth/Auth';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
        </Switch>
        </Layout>


      </div>
    );
  }
}

export default App;
