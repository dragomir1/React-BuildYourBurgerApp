import React from 'react';
import classes from './Order.css';


const order = (props) => (
  <div className={classes.Order}>
    <p>ingredients: Salad (1)</p>
    <p>Price: <strong>$$</strong></p>
  </div>
);


export default order;
