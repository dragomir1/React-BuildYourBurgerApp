import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Lettuce:', type: 'lettuce'},
  {label: 'Bacon:', type: 'bacon'},
  {label: 'Cheese:', type: 'cheese'},
  {label: 'Meat:', type: 'meat'},
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Your Burger Price: <strong>${props.price.toFixed(2)}</strong> </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    ))}
    <button className={classes.OrderButton}
    disabled={!props.toBePurchased}
    {/*we are passing the isAuthenticated prop to this button.  if the user is authenticated, then they can purchase.  otherwise they need to sign in to continue.  this is a ternary expression*/}
    {/*We need to make sure the button does the right thing now. we want this button only to work if authenticated.  if not we want to redirect to sign up page once the button is clicked. 'onCLick', executes the ordered method. which is passed from burgerbuilder.*/}
    onClick={props.ordered}>{props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
  </div>


);

export default buildControls;
