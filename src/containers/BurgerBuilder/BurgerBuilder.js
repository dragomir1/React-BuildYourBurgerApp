import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// globally scoped.
const INGREDIENT_PRICES = {
  lettuce: .5,
  cheese: .75,
  meat: 1.5,
  bacon: 1,
};


class BurgerBuilder extends Component {

  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    toBePurchased: false,
    purchasing: false
  }

updatePurchaseState (ingredients) {
  // this will create an array of string entries.
  // we map the array we created into the array we need.  we just want values.
  const sum = Object.keys(ingredients)
  .map(igKey => {
    return ingredients[igKey]
  })
  // reduce the array into a single number.  the sum of all ingredients. we start at 0. then we have a function that is executed on each element of the array. the function takes two arguments.
  // "sum" is the consistently updated current sum. so when it finishes the itteration, the sum is the most current update.
  .reduce((sum, el) => {
    return sum + el;
  }, 0);
    this.setState({toBePurchased: sum > 0});
}

addIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type];
  const updatedCount = oldCount + 1;
  const updatedIngredients = {
    ...this.state.ingredients
  };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

removeIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type];
  if(oldCount <=0) {
    return;
  }
  const updatedCount = oldCount - 1;
  const updatedIngredients = {
    ...this.state.ingredients
  };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
}

purchaseHandler = () => {
  this.setState({purchasing: true});
}

cancelOrderHandler = () => {
  this.setState({purchasing: false});
}

continueOrderHandler = () => {
  alert("You will be the owner of this tasty burger!");
}

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    return (
      <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.cancelOrderHandler}>
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchasedCancelled={this.cancelOrderHandler}
          purchaseContinue={this.continueOrderHandler} />
      </Modal>
        <Burger
        ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          toBePurchased={this.state.toBePurchased}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}


export default BurgerBuilder;
