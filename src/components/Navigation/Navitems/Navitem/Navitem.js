import React from 'react';
import classes from './Navitem.css';
// NavLink styles the active link
// USE THE DEFAULT OF HAVING A CSS STYLE CLASS NAMED "ACTIVE"
import { NavLink } from 'react-router-dom';


// when using routing, you do not use anchor tags. You use link component provided by the react router.
// ****IF THE ACTIVE CLASS DOESNT WORK IT'S BECUASE OF THIS:  IT'S RELATED TO CSS MODULES.
// CSS MODULES CONVERSTS TAKES THE CLASS NAMES AND CONVERSTS THEM INTO UNIQUE CLASS NAMES WITH SOME HASHTAG ATTACHED TO IT. TEHREFOR ACTIVECLASS ATTACHED BY NAVLINK AT RUNITME IS DIFFERENT THAN THE CLASS AT THE BEGINING.
// THE NAV LINK AUTOMATICALLY APPENDS A CLASS NAMED ACTIVE.
// TO FIX THAT, THE NAVLINK ELEMENT HAS AN EXTRA PROPERTY WE CAN USE. IT'S CALLED "ACTIVECLASSNAME"

const navItem = (props) => (

    <li className={classes.Navitem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeclassname={classes.active}
        >{props.children}</NavLink>
    </li>
);


export default navItem;
