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
      <Navitems />
    </nav>
  </header>
);
export default toolbar;
