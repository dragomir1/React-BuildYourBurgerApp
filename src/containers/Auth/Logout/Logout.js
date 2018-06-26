// this is the logout file.
// we need to 1) dispatch an action and 2)re-direct

import React, { Component } from 'react';
import * as actions from '../../../store/index';

// we are redirecting by using the redirect component of react-router-dom.
import { Redirect } from 'react-router-dom';
// connecting the Logout container to the store. this is a wrapper that we use on the export.
import { connect } from 'react-redux';

// componentDidMount mounts a component before the page renders.  so in this case, this is the first thing it will do before we render.  the logout component mounts.
class Logout extends Component {
  componentDidMount () {
    this.props.onLogout();
  }
  render () {
    // this simply redirects.  now we need to make sure this container gets loaded for /logout. this is in the APP.js file.
    return <Redirect to="/" />;
  }
}

// this allows us to dispatch this action in this container.
mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};
// we wrap the logout container with the result of the connect function call.
export default connect(null, mapDispatchToProps)(Logout);
