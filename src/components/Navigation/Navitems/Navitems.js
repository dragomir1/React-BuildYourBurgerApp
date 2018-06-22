import React from 'react';
import classes from './Navitems.css';
import Navitem from './Navitem/Navitem';

// for boolean props we can just pass the prop and NOT set it to "true" or "false".

const navitems = (props) => (
  <ul className={classes.Navitems}>
    <Navitem link="/" exact>Burger Builder</Navitem>
    <Navitem link="/orders">Orders</Navitem>
  </ul>
);


export default navitems;
