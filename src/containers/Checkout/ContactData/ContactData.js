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
    orderForm: {
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

// this is the onchanged handler that passed the prop that reacts to the user input...that gets the user input when they type data in.
// we need two arguments one is the event(e) which we can find the targeted value.  the second arugment is the imputId..which needs to have a two way binding setup. the second argument reaches out to the state, gets the right element and adjusts it's value.
inputChangedHandler = (event, inputId) => {
  // this logs it to console to see if it's working...
console.log(event.target.value);
    const updatedOrderForm = {
        // this makes a clone of the state...HOWEVER..it does not make a deep clone beciase we have nested objects.
      ...this.state.orderForm
    };
      // this is how to clone deeply.  cloning all the nested elements in state.

    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.values;
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({orderform: updatedOrderForm});
  };

  render () {
    // RENDERING THE FORM INPUTS DYNAMCIALLY. WE NEED TO TAKE THE USERFORM OBJECT AND TURN THEM INTO AN ARRAY SO WE CAN LOOP THROUGH THEM. the id are the keys, the name and identifiers.  the config are the values for a given key.  so it would be the values on the right side of the keys (look at state)
    //
    //   once we have our array..we can create form and loop through all the elements..see below in form.

    const formElementArray = [];
      for( let key in this.state.orderForm) {
        formElementArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
// the method applied to change, should be an anonymous funtion can we can pass arguments to the method.  we are creating a two way-binding.  we get and pass the event object, created by react. and we we pass the id, or the identifier, which are the keys in our form state ie: name, street, zipcode.
    let form = (
                <form>
                  {formElementArray.map(formElement => (
                    <Input
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                  ))}
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
