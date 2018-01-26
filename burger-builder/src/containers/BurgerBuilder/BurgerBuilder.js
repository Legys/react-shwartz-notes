import React, { Component } from "react";

import axios from "axios";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux";
import withErrorHandler from '../../hoc/withErrorHandler'
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/ui/Spinner/Spinner'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  async componentDidMount() {
    try {
      const response = await axios.get('/ingredients.json')
      this.setState({ ingredients: response.data })
    } catch (error) {
      this.setState({ error: true })
      throw error
    }
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinueHandler = () => {
    console.log(this)
    this.props.history.push({
      pathname: '/checkout',
      search: `?meat=${this.state.ingredients.meat
        }&salad=${this.state.ingredients.salad
        }&cheese=${this.state.ingredients.cheese
        }&bacon=${this.state.ingredients.bacon
        }&price=${this.state.totalPrice}`
    })
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
    // for (let key in disabledInfo) {
    //   disabledInfo[key] = disabledInfo[key] <= 0
    // }
    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    let orderSummary = null
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    let burger = this.state.error ? <p> Ingredients can't be loaded</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />,
        <BuildControls
            ingredientChanged={this.changeIngredientHandler}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchaseable={!this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
        totalPrice={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseCanceled={this.closeModal}
        purchaseContinued={this.purchaseContinueHandler}
      />
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} closed={this.closeModal}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);