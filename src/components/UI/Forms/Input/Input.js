import React from 'react';
import classes from './Input.css';

//
const input = (props) => {
  let inputElement = null;

// SPREADING THE PROPS and distributing them on the input element, HANDLES THE CASE OF HANDLING DIFFERENT ATTRIBUTES.  we get the attributes we set on the input as props for our input wrapper.
// any default HTML elements you want to set on your input, you only need to set the inputType prop and then pass the attribute to that inputType
  switch (props.elementType) {
      case ('input'):
          inputElement = <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value} />
        break;
      case ('textarea'):
      inputElement = <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value} />
        break;
      default:
        inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />

  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;
