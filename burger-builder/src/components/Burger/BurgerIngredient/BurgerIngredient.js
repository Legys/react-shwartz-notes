import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./BurgerIngredient.css";

export default class BurgerIngredient extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      "bread-bottom",
      "bread-top",
      "meat",
      "cheese",
      "salad",
      "bacon"
    ]).isRequired
  };
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={classes.Meat} />;
        break;
      case "cheese":
        ingredient = <div className={classes.Cheese} />;
        break;
      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;
      case "bacon":
        ingredient = <div className={classes.Bacon} />;
        break;
      default:
        ingredient = null;
        break;
    }
    return ingredient;
  }
}
