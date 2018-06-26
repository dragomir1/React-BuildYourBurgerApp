import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navitems from '../Navitems/Navitems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      // here we create a new prop and pass the isAuth prop from the Layout.js file.  inturn we will be passing these to the navitems
      // Here isAuthenticated will be passed to navitems as a prop and we pass isAuth as a prop to that.  we also pass it to the SideDrawer file.
      <Navitems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);
export default toolbar;
