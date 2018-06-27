// creating a class based component.  we need to inport react and the component function.
import React, { Component } from 'react';
// we need to import the input and button component so that we're able to dynamically create the form.
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

// we're connecting this CONTAINER to redux.
import { connect } from 'react-redux';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axiosOrders';

// importing redirect fromt the router to redirect the users if they are authenticated.
import { Redirect } from 'react-router-dom';

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
    },
    // this sets it that we should be in signup mode initially.
    isSignUp: true,
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

submitHandler = (event) => {
  event.preventDefault();
  // we need to pass email and password when executing.  so we are getting that info from the state. once it has been inputed, we then grab it with the code syntax below.
  this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
}

// now we need to create an off switch mode handler for switching between sign in and new user.
switchAuthModeHandler = () =>
// we are calling setState in it's function form which recevies an a prevState argument.
    this.setState(prevState => {
      // we return the object which gets merged with the old state.
      // we are just switching values.
      return {
          isSignUp: !prevState.isSignUp
      };
    })

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

      // WE ARE ADDING A SPINNER TO SHOW US THAT SOMETHING IS LOADING...
      if(this.props.loading) {
        form = <Spinner />
      }

      // we are creating an error message. by default it might be null.  we do and if statement and return jsx. the 'message' property is only avail from firebase.
      let errorMessage = null
      if(this.props.error) {
        errorMessage = (
          <p>{this.props.error.message}</p>

        )
      }
      //this is the redirect code to check if users are authenticated and if so, redirect them to the appropriate place. in this case the main burgerBuilder page.
      let authRedirect = null //by default it's null.
      if(this.props.isAuthenticated) {
          authRedirect = <Redirect to="/" />;

      }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        // before we see something, we have to make sure we really store that error message.
        {errorMessage}
      // once we connected, now we can execte onAuth in our props everytime this form is submittd. to do that we need to set up a prop in the form field. we add an onSubmit handler.
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        // we are adding a sign-in feature
        // here we are replacing hardcoded 'signin' to dynamically generated signin if the current state is signup and signup if the current state is signin.
        <Button
          {/*adding clicked property=>in Button.js file, there's a click property attached to the onclick handler. =>. we are executing the switchAuthNodeHandler everytime the button is clicked.*/}
          clicked={this.switchAuthModeHandler}
          btntype="Danger">Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP" }

        </Button>
      </div>
    );
  }
}
// getting a slice of the state.  we are mapping a slice of the state to our local props
// the 'auth' is from our index file where we combined reducers.  the loading propety is in our auth reducer.
const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      // we are redirecting the users once they are authenticated.  we need to get access to the token slice of the state.  if it's not null, they are authenticated
      isAuthenticated: state.auth.token !== null
    }
}

// THIS ALLOWS US TO DISPATCH SOMTHING VIA PROPS IN THIS container
const mapDispatchToProps = dispatch => {
  return {
    // use as a method and holds a reference to a method.
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Auth, axios));
