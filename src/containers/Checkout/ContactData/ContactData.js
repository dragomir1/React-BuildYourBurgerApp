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
  // touched key sets us up so that it tracks whether the user added an input. it only checks the validity only if the element was touched.
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
        },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode',
        },
      value: '',

      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'fastest'},
            {value: 'cheapest', displayValue: 'cheapest'}
          ]
        },
      value: '',
      // this solves the error with the drop down. since there is no validaiton, it's nieter true nor false. adding this validaiton makes all the controls congfigured equally.
      validation: {},
      valid: true
      }
    },
    formIsValid: false,
    loading: false
  }


// this method gets activalted when somebody clicks on the order button.
// WE NEED ACCESS TO THE INDERGIENTS FROM CHECK OUT SO THAT WE PLACE OUR ORDER..THERE IS A TRICK FOR THAT.  LOOK AT CHECKOUT.JS AND NOTICE THAT THE COMPONENT PROP WAS CHAGNGED FOR RENDER PROP.
// we add the preventDefault so that the form doesnt reload when we hit the order button.
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    //USING POST BECUASE WE ARE STRORING DATA.
    // json extentions is just for firebase.
    // this variable is what we use to submit information to the database.
    const formData = {};
    for (let formDataID in this.state.orderForm) {
      formData[formDataID] = this.state.orderForm[formDataID].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
// WE WAANT TO GET THE DATA FORM THE STATE.  WE ONLY CARE ABOUT THE NAME/VALUE PAIR.  IT NEEDS TO BE MAPPED TO EACH OTHER.

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
// CREATING METHOD TO CHECK FOR INPUT VALIDATIONS.
  checkValidation(value, rules) {
    // THIS FIXES THE VALIDAITON FLAW MENTIONED BELOW.
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
// THIS IS FLAWED BECUASE WE'RE CHECING FOR VALUE LENGTHS ONE AFTER THE OTHER. TO FIX THE VALIDATION FLAW WE SET THE ISVALID VARIABLE TO TRUE.
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }
// LOADING THE SPINNER...setting up form variable as a defualt..ONCE DONE WE NEED TO REDIRECT AFTER PROPLE HIT THE ORDER BUTTON.

// this is the onchanged handler that passed the prop that reacts to the user input...that gets the user input when they type data in.
// we need two arguments one is the event(e) which we can find the targeted value.  the second arugment is the imputId..which needs to have a two way binding setup. the second argument reaches out to the state, gets the right element and adjusts it's value.
inputChangedHandler = (event, inputIdentifier) => {
  // this logs it to console to see if it's working...
console.log(event.target.value);
    const updatedOrderForm = {
        // this makes a clone of the state...HOWEVER..it does not make a deep clone beciase we have nested objects.
      ...this.state.orderForm
    };
      // this is how to clone deeply.  cloning all the nested elements in state.

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

// ONCE WE ADDED VALIDATIONS AND CREATE THE CHECKVALIDATION METHOD. WE NEED TO UPDATED THE VALID VALUE OF THE updatedFormElement element.
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value,
    updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

// CHECKING AND LOOPING THROUGH FORM ELEMNTS TO CHECK IF THE ENTIRE FORM IS VALID. THE PROBLEM IS THAT DOING IT THIS WAY, ONLY THE LAST CHECK DETERMINES THE VALUE OF formIsValid. SO WE NEED TO SET THE FORM TO TRUE.
      // this checks if the given element is true and if the form in general is true as well. if both is the case, then formIsValid is updated to true.
    let formIsValid = true;
    for(let inputIds in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIds].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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


// React has an onSubmit event handler to use when we submit a form.

{/*should validate should not work on the dropdown. it should only be red if there is a validation object.*/}
// we bind the disabled attribute on the button to the state and this will disable the button if form is not valid.
    let form = (
                <form onSubmit={this.orderHandler}>
                  {formElementArray.map(formElement => (
                    <Input
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      value={formElement.config.value}
                      changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                  ))}
                  <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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
