import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../ui/Button/Button";
import { Link } from 'react-router-dom'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A deliciouts burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to purchase</p>
      <p>Total price: {props.totalPrice.toFixed(2)}</p>
      <Button btnType="Danger" onClick={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" onClick={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;