import React from 'react';
import classes from './Input.css';

//
const input = (props) => {
  let inputElement = null;

// SPREADING THE PROPS and distributing them on the input element, HANDLES THE CASE OF HANDLING DIFFERENT ATTRIBUTES.  we get the attributes we set on the input as props for our input wrapper.
// any default HTML elements you want to set on your input, you only need to set the inputType prop and then pass the attribute to that inputType

// WE NEED TO CREATE SELECT ELEMENTS IN OUR INPUT Component.

  switch (props.elementType) {
      case ('input'):
          inputElement = <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />
        break;
      case ('textarea'):
      inputElement = <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />
        break;
      case ('select'):
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}
              onChange={props.changed}>
                 {option.displayValue}
            </option>
          ))}
        </select>
      );
        break;
      default:
        inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />

  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;
