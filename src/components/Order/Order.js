import React from 'react';
import classes from './Order.css';


const order = (props) => {
  const ingredients = [];
  for(let ingredientname in props.ingredients) {
    // pushing a js object.
    ingredients.push(
      {
        name: ingredientname,
        amount: props.ingredients[ingredientname]
      }
    )
  }

  // once we push the ingedients we need to map it and render it as text.

  const ingredentOutput = ingredients.map(ig => {
    return <span
    style={{
        testTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
        }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
  });
  return (
    <div className={classes.Order}>
      <p>ingredients:  {ingredentOutput}</p>
      <p>Price: <strong>{props.price}</strong></p>
    </div>
  )

};


export default order;
