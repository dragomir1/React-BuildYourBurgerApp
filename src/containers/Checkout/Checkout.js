import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
// Loading the ContactData component through routing.
import { Route } from 'react-router-dom';
// after importing the route we need to import the component we are loading. which is the ContactData component.
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';



class Checkout extends Component {
    // state = {
    //   ingredients: null,
    //   price: 0
    // }

    // componentWillMount() {
    //   // extracting the new ingredients data
    //   const query = new URLSearchParams(this.props.location.search);
    //   // created a new ingredients constant to store the extracted ingredients in an
    //   const ingredients = {};
    //   let price = 0;
    //   // THIS LOOPS THROUGH DIFFERENT QUERY PARAMS ENTRIES...
    //   for (let param of query.entries()) {
    //     // EACH ENRTY WILL HAVE THE FORMANT ['SALAD', '1']
    //     // the left side is the property name added to the ingredients object.
    //     // the right side is the value.  add a '+' to convert it to a number.
    //
    //     // PRICE IS NOT AN INGREDIENT.  SO WE CAN'T PUSH IT TO THE IGREDIENTS LIST.
    //     if(param[0] === 'price') {
    //       // we are extracting the price value and storing it in the variable.
    //         price = param[1];
    //     } else {
    //       ingredients[param[0]] = +param[1];
    //       }
    //   }
    //
    //   // once its done, we update the state with the new ingredients.
    //   this.setState({ingredients: ingredients, totalPrice: price});
    //
    // }
// since the checkout was loaded with the route component we have access to the special propterties on the URL object...
checkoutCancelledHandler = () => {
      this.props.history.goBack();
    }

checkoutContinueHandler = () => {
      this.props.history.replace('/checkout/contact-data');
}

// WE ARE LOADING THE ContactData ROUTE BELOW THE Checkout Component.  The first part is the current path we are on  and the second part is the pointer to the new route.
// the component prop loads the component that will become this new route.  in this case ContactData

// REPLACE Component WITH RENDER PROP SO THAT WE CAN PASS PROPS TO THE ContactData Component

// WE NEED TO REDIRECT ONCE THE USER CLIKS ON THE ORDER BUTTON.  WE PASS PROPS IN THE RENDER METHOD..we pass the props as a parmater then we spread operator to pass what ever we get in the props to the contact data. inclduing the history prop.
  render () {
    return (
      <div>
        <CheckoutSum
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler} />
          <Route path={this.props.match.path + '/contact-data'}
            component={ContactData} />

      </div>
    );
  }
}
// return a JS object where we map the redux state to the props of this container.
const mapStateToProps = state => {
  return {
      ings: state.ingredients
  }
};

// DON'T NEED mapDispatchToProps.  WE ARE NOT DISPATCHING ANYTHING...



// SIDENOTE: IF YOU ONLY HAVE MAPSTATETODISPATCH AND NOT MAPSTATETOPROPS, YOU NEED TO DO THIS:
// export default connect(NULL, MAPSTATETODISPATCH)(Checkout);
// MAPSTATETODISPATCH ALWAYS NEEDS TO BE THE SECOND ARGUMENT. SO NULL NEEDS TO TAKE THE PLACE OF mapStateToProps.
export default connect(mapStateToProps)(Checkout);
