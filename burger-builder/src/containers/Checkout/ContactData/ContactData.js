import React, { Component } from "react";
import Button from "../../../components/ui/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/ui/Spinner/Spinner";
import axios from "axios";
import Input from "../../../components/ui/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "Alexandr Dubrovin",
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    Object.keys(this.state.orderForm).forEach(
      key => (formData[key] = this.state.orderForm[key].value)
    );
    const orderObj = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("/orders.json", orderObj);
        this.setState({ loading: false });
        this.props.history.push("/");
        resolve(response);
      } catch (error) {
        this.setState({ loading: false });
        reject(error);
      }
    });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    console.log(value, isValid);
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    Object.keys(updatedOrderForm).forEach(
      key => (formIsValid = updatedOrderForm[key].valid && formIsValid)
    );
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementsArray = [];
    Object.keys(this.state.orderForm).forEach(key =>
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    );
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          onClick={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
