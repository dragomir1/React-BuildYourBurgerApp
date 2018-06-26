import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


//  WE ARE CONNECT THE LAYOUT TO THE REDUX STORE.  SO THAT WE CAN PASS THE AUTH information TO TOOLBAR AND SIDEDRAWER WHICH THEN IN TURN COULD PASS IT TO NAVIGATION ITEMS.
import { connect } from 'react-redux';


class Layout extends Component {

  state= {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }
// WHEN USING THIS.STATE IN SETSTATE IT MAY LEAD TO UNEXPECTED OUTCOME DUE TO THIS.STATE'S ASYCHRONOUS NATURE. do this instead. clean way to set the state when it depends on the old state.
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
  });
}
  render () {
    return (
      <Aux>
        // adding a new prop and passing isAuthenticated.  Now we need to edit the these two componemts to be able to use the new prop.
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler} />
        // adding a new prop and passing isAuthenticated
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

// here we are getting the token slice of the state.  here we are saying if the authentication is not null, isAuthenticated is then true.  the person has been authenticated.
const mapStateToProps = state => {
  isAuthenticated: state.auth.token !==null,
}

export default connect(mapStateToProps)(Layout);
