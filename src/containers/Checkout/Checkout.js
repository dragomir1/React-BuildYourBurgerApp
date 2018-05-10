import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';



class Checkout extends Component {
    state = {
      ingredients: {
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
      }
    }


  render () {
    return (
      <div>
        <CheckoutSum ingredients={this.state.ingredients} />
      </div>
    );
  }
}


export default Checkout;
