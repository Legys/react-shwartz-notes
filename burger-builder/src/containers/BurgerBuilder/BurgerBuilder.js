import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import axios from "axios";
import Burger from "../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Aux";
import withErrorHandler from "../../hoc/withErrorHandler";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/ui/Spinner/Spinner";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  async componentDidMount() {
    this.props.onInitIngredients();
    // try {
    //   const response = await axios.get('/ingredients.json')
    //   this.setState({ ingredients: response.data })
    // } catch (error) {
    //   this.setState({ error: true })
    //   throw error
    // }
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  closeModal = () => {
    this.setState({ purchasing: false });
  };

  changeIngredientHandler = (type, sign) => {
    if (sign === "+") {
      this.props.onIngredientAdded(type);
    } else if (sign === "-") {
      this.props.onIngredientRemoved(type);
    }
    // const oldCount = this.state.ingredients[type];
    // const updatedCount = sign === "+" ? oldCount + 1 : oldCount - 1;
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // };
    // updatedIngredients[type] = updatedCount;
    // const oldPrice = this.state.totalPrice;
    // const newPrice =
    //   sign === "+"
    //     ? oldPrice + INGREDIENT_PRICES[type]
    //     : oldPrice - INGREDIENT_PRICES[type];
    // this.setState({
    //   totalPrice: newPrice,
    //   ingredients: updatedIngredients
    // });
    // this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, ingredient) => {
        return sum + ingredient;
      }, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    // for (let key in disabledInfo) {
    //   disabledInfo[key] = disabledInfo[key] <= 0
    // }
    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = this.props.error ? (
      <p> Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />,
          <BuildControls
            ingredientChanged={this.changeIngredientHandler}
            price={this.props.totalPrice}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ings}
          purchaseCanceled={this.closeModal}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(dispatch(actions.removeIngredient(ingName))),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
