// this is a container beucase it will manage it's own state.
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }


// this method gets activalted when somebody clicks on the order button.
// WE NEED ACCESS TO THE INDERGIENTS FROM CHECK OUT SO THAT WE PLACE OUR ORDER..THERE IS A TRICK FOR THAT.  LOOK AT CHECKOUT.JS AND NOTICE THAT THE COMPONENT PROP WAS CHAGNGED FOR RENDER PROP.
// we add the preventDefault so that the form doesnt reload when we hit the order button.
  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true})
    //USING POST BECUASE WE ARE STRORING DATA.
    // json extentions is just for firebase.
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Bob",
        address: {
          street: 'teststreet 1',
          zipCode: 12345,
          country: 'US and A'

        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fast'
    }

    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false});
      // once we pass the props from the checkout we have access to the history prop and are able to use the push method on it to redirect to index page. on ce users click "order"
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({loading: false});
    });
  }
// LOADING THE SPINNER...setting up form variable as a defualt..ONCE DONE WE NEED TO REDIRECT AFTER PROPLE HIT THE ORDER BUTTON.
  render () {
    let form = (
                <form>
                  <input className={classes.Input} type="text" name="name" placeholder="your name" />
                  <input className={classes.Input} type="email" name="email" placeholder="your email" />
                  <input className={classes.Input} type="text" name="street" placeholder="your street" />
                  <input className={classes.Input} type="text" name="zipCode" placeholder="your zip code" />
                  <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
    if(this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Info</h4>
          {form}
      </div>

    );
  }

}

export default ContactData;
