import React from 'react';
import classes from './Input.css';

//
const input = (props) => {
  let inputElement = null;
  // WE ARE ADDING VALIDATION FEEDBACK.
  const inputClasses =[classes.InputElement];

// this sets up the drop down menu to be excluded from validation.
  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.InValid);
  }

// SPREADING THE PROPS and distributing them on the input element, HANDLES THE CASE OF HANDLING DIFFERENT ATTRIBUTES.  we get the attributes we set on the input as props for our input wrapper.
// any default HTML elements you want to set on your input, you only need to set the inputType prop and then pass the attribute to that inputType

// WE NEED TO CREATE SELECT ELEMENTS IN OUR INPUT Component.

  switch (props.elementType) {
      case ('input'):
          inputElement = <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
        break;
      case ('textarea'):
      inputElement = <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
        break;
      case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
        break;
      default:
        inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;

  }

  let validationError = null;
  if (props.invalid && props.touched) {
      validationError = <p className={classes.ValidationError}>Please enter a valid value.</p>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default input;
