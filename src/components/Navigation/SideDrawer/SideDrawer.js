import React from 'react';
import Logo from '../../Logo/Logo';
import Navitems from '../Navitems/Navitems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open];
    }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          // here we create a new prop and pass the isAuth prop from the Layout.js file.  inturn we will be passing these to the navitems
          // Here isAuthenticated will be passed to navitems as a prop and we pass isAuth as a prop to that.  we also pass it to the SideDrawer file.
          <Navitems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
