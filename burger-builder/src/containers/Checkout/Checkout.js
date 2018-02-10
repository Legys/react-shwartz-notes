import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    Array.from(query).forEach(q => {
      if (q[0] === "price") {
        price = q[1];
      } else {
        ingredients[q[0]] = Number(q[1]);
      }
    });
    this.setState({ ingredients, price });
  }
  hanldeCancel = () => {
    this.props.history.goBack();
  };
  handleContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log(this.props.match);
    return (
      <div>
        <CheckoutSummary
          onCancel={this.hanldeCancel}
          onContinue={this.handleContinue}
          ingredients={this.props.ings}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
