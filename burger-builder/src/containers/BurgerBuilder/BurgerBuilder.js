import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.9
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinueHandler = () => {
    console.log("Continue");
  };

  closeModal = () => {
    this.setState({ purchasing: false });
  };

  changeIngredientHandler = (type, sign) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = sign === "+" ? oldCount + 1 : oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldPrice = this.state.totalPrice;
    const newPrice =
      sign === "+"
        ? oldPrice + INGREDIENT_PRICES[type]
        : oldPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, ingredient) => {
        return sum + ingredient;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    Object.keys(this.state.ingredients).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });
    return (
      <Aux>
        <Modal show={this.state.purchasing} closed={this.closeModal}>
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.closeModal}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientChanged={this.changeIngredientHandler}
          price={this.state.totalPrice}
          disabled={disabledInfo}
          purchaseable={!this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}
