import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// withRouter is a HOC that allows us to gain access to the special URL match, location and history props in any component. if the component is not part of the routeable area of project.
import { withRouter } from 'react-router-dom';

// Object is a default js object. not provided by React.
// keys method extracts the keys of a given object and turns it into an array. => an array of the keys.
// the Array method is provided by JS. => Array(3) will give you an array with three undefined spaces
// the object "Object" has a keys method.  and it extracts the keys of a given object and converts them to an array.  It gives you an Array of the keys.
// you chain the map method becuase keys returns us an array.  the map executes a function on each element in the input array.
// we recieve an argument called "igKey" to id the elements in the array.
// in the function, we transform this string value(the value that each key holds) into an array with as many elements as is the value of the given ingredient. so "cheese: 2"  => an array with 2 undefined spaces [ , ]
// user the spread operator to spread the new array (from the map method...)
// use the Array() method provided by JS. to create a new array. so array(3) => [ , , ] three undefined spaces.
// here the length of the Array() should be the amount of the given ingredient.
// we add an inner map method to map the elements

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])] // => up to this point...[ , ]
      // BELOW: the first argument is a blank indicated by the "_".  The second argument, is the index of that element/
      .map((_, i) => {
        // we need to return an array of JSX in the end.  we need to assign a key when returning an array.
        // the key contains the igKey which is the ingredient and i is the amount.
        return <BurgerIngredient key={igKey + i} type={igKey} />
      }); // [ , ]
    })
    // reduce is a built in array function which allows us to transform an array into something else.  It takes a fuction as an input and this function recieves 2 arguments passed in by js, the previous value and the current value.
    // the reduce methos also accepts an initial value, the initial value of the reduced value.  an empty  array.
    // you return the updated value starting with the initial [] and stored in arr.
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    if(transformedIngredients.length === 0) {
      transformedIngredients = <p> Customize your Burger! </p>
    }

  return (
    <div className={classes.Burger}>
    <BurgerIngredient type="bread-top" />
      {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
