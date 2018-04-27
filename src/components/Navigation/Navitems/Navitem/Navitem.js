import React from 'react';
import classes from './Navitem.css';


const navItem = (props) => (

    <li className={classes.Navitem}>
      <a
        href={props.link}
        className={props.active ? classes.active : null}>{props.children}</a>
    </li>

);


export default navItem;
