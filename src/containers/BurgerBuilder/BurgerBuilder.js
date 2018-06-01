import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {

  state = {
    // ingredients: {
    //   lettuce: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0
    // },
    // totalPrice: 0,
    toBePurchased: false,
    purchasing: false,
    loading: false,
    error: false
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

// addIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   const updatedCount = oldCount + 1;
//   const updatedIngredients = {
//     ...this.state.ingredients
//   };
//     updatedIngredients[type] = updatedCount;
//     const priceAddition = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice + priceAddition;
//     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
//     this.updatePurchaseState(updatedIngredients);
//   }

// removeIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   if(oldCount <=0) {
//     return;
//   }
//   const updatedCount = oldCount - 1;
//   const updatedIngredients = {
//     ...this.state.ingredients
//   };
//     updatedIngredients[type] = updatedCount;
//     const priceDeduction = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice - priceDeduction;
//     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
//     this.updatePurchaseState(updatedIngredients);
// }

purchaseHandler = () => {
  this.setState({purchasing: true});
}

cancelOrderHandler = () => {
  this.setState({purchasing: false});
}

continueOrderHandler = () => {



// BUILDING THE LOGIC TO PASS THE INGREDIENTS WE PICKED ON TO THE CHECKOUT CONTAINER USEING QUERY PARAMS.
// we are passing ingredients through a search query. we set the search paramter to an empty string.
// then we are encoding the igredients into a search query by creating an array...

  const queryParams = [];
  // looping through the state and adding elements to the queryParams array
  // encodeURIComponent IS A JS PROVIDED HELPER METHOD THAT ENCODES ELEMENTS SUCH THAT THEY CAN BE USED IN THE URL. we need an "=".  in params its "key = something..."
  for(let i in this.state.ingredients) {
    // this is basically a an array that has a couple of strings: property name plus the value of that property.
    //
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
  }
// then we take that array of strings and join them with an '&' sign.

//  WHEN WE HIT CONTINUE BUTTON..AND GETS SENG TO THE CHECKOUT..IT NEEDS TO BE PARCED.

//  WE NEED TO PASS THE TOTAL PROCE ALONG WITH THE INGEDIENTS TO THE CHECKOUT CONTAINER.
  queryParams.push('price=' + this.state.totalPrice);

  const queryString = queryParams.join('&');

  this.props.history.push({
      pathname: "/checkout",
      search: '?' + queryString
  });



}

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = <OrderSummary
      ingredients={this.props.ings}
      price={this.props.price}
      purchasedCancelled={this.cancelOrderHandler}
      purchaseContinue={this.continueOrderHandler} />;

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
      <Modal show={this.state.purchasing} modalClosed={this.cancelOrderHandler}>
        {orderSummary}
      </Modal>
        <Burger
        ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          toBePurchased={this.state.toBePurchased}
          ordered={this.purchaseHandler}
          price={this.props.price}/>
      </Aux>
    );
  }
}
// this returns an object that defines which propotery should hold which slice of the state
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

// craeted a global error handler by wrapping the burgerbuilder with the HOC.
// connect is a function that we pass mapStateToProps and mapDispatchToProps as arguments
// we also pass the entire errorHandler call as an argument to this connect function call that returns us.
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
