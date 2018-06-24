import React from 'react';
import classes from './Navitems.css';
import Navitem from './Navitem/Navitem';

// for boolean props we can just pass the prop and NOT set it to "true" or "false".
// here we added a navitgation/ route link to Authenticate...see below.

const navitems = (props) => (
  <ul className={classes.Navitems}>
    <Navitem link="/" exact>Burger Builder</Navitem>
    <Navitem link="/orders">Orders</Navitem>
    <Navitem link="/auth">Authenticate</Navitem>
  </ul>
);


export default navitems;
