import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSum.css';


// activating the buttons for placing an order.
const CheckoutSummary = (props) => {
  return (
      <div className={classes.CheckoutSummary}>
        <h1>Enjoy your tasty burger</h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button
          btnType="Danger"
          clicked={props.checkoutCancelled}>Cancel Order</Button>
        <Button
          btnType="Success"
          clicked={props.checkoutContinue}>Submit Order</Button>

      </div>
  );
}




export default CheckoutSummary;
