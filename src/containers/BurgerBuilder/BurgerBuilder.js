import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
// connecting the burgerBuilder container to the store. this is a wrapper that we use on the export.
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions';
import * as actionCreators from '../../store/actions/index';
import axios from '../../axiosOrders';

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  }
// this is the last step...once you ADD the function to mapDispatchToProps, we need to mount it.
  componentDidMount () {
    this.props.onInitIngredients();
  }

updatePurchaseState (ingredients) {
  // this will create an array of string entries.
  // we map the array we created into the array we need.  we just want values.
  const sum = Object.keys(ingredients)
  .map(igKey => {
    return ingredients[igKey];
  })
  // reduce the array into a single number.  the sum of all ingredients. we start at 0. then we have a function that is executed on each element of the array. the function takes two arguments.
  // "sum" is the consistently updated current sum. so when it finishes the itteration, the sum is the most current update.
  .reduce((sum, el) => {
    return sum + el;
  }, 0);
  // WE ARE RETURNING THE RESULT OF OUR BOOLEAN CHECK. THEN WE CALL THIS HANDLER IN THE BUILD CONTROLS AND PASS THE INGREDIENTS.
  // this.setState({toBePurchased: sum > 0});
    return sum > 0;
}
// WE REMOVE THIS ADD AND REMOVE INGREDIENTS HANDLERS BECAUSE NOW IT'S HANDLED BY REDUX.
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
  // this method is passed to the ordered handler which in turn is passed to the buildControls butoon and executed when clicked. we are checking for authentication.  if they are not, we redirect them to the sign in page.
  let isAuth = null;
  if(this.props.isAuthenticated) {
    this.setState({purchasing: true});
  } else {
    // we are using the history pro which is coming for the react router.  we are pushing the user to the auth page.
    // we are using the onSetRedirectPath prop to dispatch an action we can place it either beofre or after the redirect to the auth page.
    this.props.onSetRedirectPath('/checkout')
    this.props.history.push('/auth');
  }
}

cancelOrderHandler = () => {
  this.setState({purchasing: false});
}

continueOrderHandler = () => {

// BUILDING THE LOGIC TO PASS THE INGREDIENTS WE PICKED ON TO THE CHECKOUT CONTAINER USEING QUERY PARAMS.
// we are passing ingredients through a search query. we set the search paramter to an empty string.
// then we are encoding the igredients into a search query by creating an array...

//   const queryParams = [];
//   // looping through the state and adding elements to the queryParams array
//   // encodeURIComponent IS A JS PROVIDED HELPER METHOD THAT ENCODES ELEMENTS SUCH THAT THEY CAN BE USED IN THE URL. we need an "=".  in params its "key = something..."
//   for(let i in this.state.ingredients) {
//     // this is basically a an array that has a couple of strings: property name plus the value of that property.
//     //
//     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
//   }
// // then we take that array of strings and join them with an '&' sign.
//
// //  WHEN WE HIT CONTINUE BUTTON..AND GETS SENG TO THE CHECKOUT..IT NEEDS TO BE PARCED.
//
// //  WE NEED TO PASS THE TOTAL PROCE ALONG WITH THE INGEDIENTS TO THE CHECKOUT CONTAINER.
//   queryParams.push('price=' + this.state.totalPrice);
//
//   const queryString = queryParams.join('&');

// here we dispatch the purchaseInit action.  in the reducer, we add a new proptery to the state where we set puchasing to 'false' which is then set to true once the purchase is finished so that we then redirect.
// we now add the switch statement in the order reducer.
// this is the place where we want to initalize the purchase.  before we push to the checkout page
  this.props.onInitPurchase();


  this.props.history.push('/checkout');

  // this.props.history.push({
  //     pathname: "/checkout",
  //     search: '?' + queryString
  // });
}

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
    burger = (
      <Aux>
        <Burger
        ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          {/*WE CALL THIS HANDELER AND PASS THE INGREDIENTS TO RETURN THE RESULTS OF THIS FUNCITON CALL. WE WANT TO EXECUTE THIS BECUASE WE WANT THE UPDTED RESULTS EVERYTIME IT GETS REDEERED.  OTHERWISE HOW ARE YOU GOING TO KNOW THE ORDER?*/}
          toBePurchased={this.updatePurchaseState(this.props.ings)}
          {/*the ordered handler is bound to the purchaseHandler method.  this is then passed to the butotn in the build controls that is bound to the onClick method and executed when clicked.*/}
          ordered={this.purchaseHandler}
            {/*we are using the isAuthenticated prop mapped to propState.  Now we move to the BuildControls Component*/}
          isAuthenticated={this.props.isAuthenticated}
          price={this.props.price} />
      </Aux>
    );
    orderSummary = <OrderSummary
      ingredients={this.props.ings}
      price={this.props.price}
      purchasedCancelled={this.cancelOrderHandler}
      purchaseContinue={this.continueOrderHandler} />;
  }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelOrderHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

// THIS FETCHES FROM THE GLOBAL STATE.  this returns an object that defines which propotery should hold which slice of the state. Once we combine reducers and give is a different name for the key property, we need to add it here.
const mapStateToProps = state => {
  return {
    // ONCE YOU ADD THESE PROPERIES TO BE MAPPED TO THE STATE, WE NEED TO FIND ALL OCCURANCES OF THAT STATE WITHIN THE CONTAINER AND REPLACE IT WITH THIS.PROPS.PROPERTYNAME.

    // the 'burgerBuilder' and 'order' prop names comes from the index.js file. this is the prop name we used when we combined reducers.  we need to match the state to the prop name that was given in the index file.
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    // once we set the FETCH_INGREDIENTS_FAIL reducer and it's logic, we need to get info about an error.
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    // this is for setting up the users to sign in if they want to continue to purchase their burger.  this should be passed on to build controls.
    isAuthenticated: state.auth.token !== null
  };
}
// // the second argument. which kind of actions you want to dispatch in the container.
// we return a js object where we define some prop names which holds a reference to a function which will get executed to dispatch an action.
// "dispatch()" will available throught the onIncrementCounter property. when the property is executed as a function. then the dispatch() is going to get executed.
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    // ONCE WE DISPATCH THIS ACTION, WE NEED TO CALL IT IN componentDidMount METHOD.
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    // we are reapdy to dispatch this action where we initialize the burger purchase action. we call it right before we push to the checkout.
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    // this functino will dispatch an action when executed to dynamically redirect to path.
    onSetRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),

  }
}

// craeted a global error handler by wrapping the burgerbuilder with the HOC.
// connect is a function that we pass mapStateToProps and mapDispatchToProps as arguments
// we also pass the entire errorHandler call as an argument to this connect function call that returns us.
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
