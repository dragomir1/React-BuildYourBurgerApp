// this is a container beucase it will manage it's own state.
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';

class ContactData extends Component {
  // EACH PROPERTY REPRESENTS ONE INPUT I WANT TO CREATE.
  // NOW WE MUST DEFINE HOW THE IPUT SHOOULD LOOK LIKE.
  // THE elementConfig, DEIFES THE CONFIGURATION, THE NORMAL ATTRIBUTES WE CAN SET UP FOR THE CHOSEN HTML TAG. this is what will be distirbuted over the created input
  state = {
    orderform: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
        },
      value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
      value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode',
        },
      value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
      value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
      value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'fastest'},
            {value: 'cheapest', displayValue: 'cheapest'}
          ]
        },
      value: ''
      },
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
                  <Input elementType="" elementConfig="" value="" />
                  <Input inputtype="imput" type="email" name="email" placeholder="Email" />
                  <Input inputtype="imput" type="text" name="street" placeholder="Street" />
                  <Input inputtype="imput" type="text" name="zipCode" placeholder="Zip code" />
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
