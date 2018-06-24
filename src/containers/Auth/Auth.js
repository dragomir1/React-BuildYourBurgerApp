// creating a class based component.  we need to inport react and the component function.
import React, { Component } from 'react';
// we need to import the input and button component so that we're able to dynamically create the form.
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
// we are managing the state within this local state and not the redux state.  becuase we are only the values that the users enter into the form inputs. so it makes more sense to use the local state for this.

  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
      value: '',
      validation: {
        required: true,
        isEmail: true,
        isNumberic: true
      },
      valid: false,
      touched: false
      },
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 15
      },
      valid: false,
      touched: false
      }
    }
  }
// we are copying the validity logic from ContactData to check for valid inputs.
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
  if(rules.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid
  }

  if(rules.isNumberic) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }

  return isValid;
}

// we are adding a method that registers the change made by the user. we are passing the event argument that is returned by react automaticaly and the controlName that specifies which control was changed.
inputChangedHandler = (event, controlName) => {
  // WE ARE CREATING A NEW UPDAGEDCONTROLS OBJECT WHERE WE COPY THE STATE, AND THEN ONLY UPDATE JUST ONE OF THE CONTROLS WITH THE [controlName] SYNTAX.  THIS UPDATES THEM ONE AT A TIME.
  const updatedControls = {
    ...this.state.controls,
    [controlName]: {
      // we are distirbuting all the given properites for that controlName.
      ...this.state.controls[controlName],
      // we are registering the value the user types.
      value: event.target.value,
      // we are checking the validity of the data the user typed.
      // => adding validation method from above which takes two arguments(value, rules)
      valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
      // whenever the inputChangedHandler fires, the user typed something. so it's touched.
      touched: true
    }
  };
  this.setState({controls: updatedControls});
}

  render () {
      // the logic for this form is similar to the ContactData logic.
    const formElementArray = [];
      for( let key in this.state.controls) {
        formElementArray.push({
          id: key,
          config: this.state.controls[key]
        });
      }

// now we wantt to loop through it and create the form with the results of the loop.  we will map it into an array of jsx elements.

// THIS IS A DYNAMICALLY GENERATED SET OF INPUTS...and now we have a form.
// BUT TO SEE THIS CONTAINER, WE NEED TO LOAD IT VIA ROUTING.  ALL OF OUR ROUTES ARE IN APP.JS FILE.
const form = formElementArray.map(formElement = (
    <Input
    // adding a bunch of properties.  the first one being the key accessing the id prop.
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
));

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
