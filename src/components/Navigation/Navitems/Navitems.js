import React from 'react';
import classes from './Navitems.css';
import Navitem from './Navitem/Navitem';

// for boolean props we can just pass the prop and NOT set it to "true" or "false".
// here we added a navitgation/ route link to Authenticate...see below.

// we are created a conditional statement where we say if the authentication is true then we see a logout button.  else if authentication is false then we see an authentication button.

const navitems = (props) => (
  <ul className={classes.Navitems}>
    <Navitem link="/" exact>Burger Builder</Navitem>
    // here we are setting it up so that users only see 'orders' if they are authenticated. otherwise they dont'
    {props.isAuthenticated ? <Navitem link="/orders">Orders</Navitem> : null}
    {!props.isAuthenticated
      ? <Navitem link="/auth">Authenticate</Navitem>
      : <Navitem link="/logout">Logout</Navitem>
    }
  </ul>
);


export default navitems;
