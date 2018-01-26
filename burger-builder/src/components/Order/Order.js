import React from 'react';

import classes from './Order.css'

const order = (props) => {
  console.log(props.ingredients)
  const ingredients = []
  Object.keys(props.ingredients).forEach(key => ingredients.push({
    value: props.ingredients[key],
    title: key
  }))
  const ingrentOutput = ingredients.map(ingr => <span
    key={ingr.title}
    style={{
      textTransform: 'capitalize'
    }}>{ingr.title} ({ingr.value}) </span>)
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingrentOutput}</p>
      <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;