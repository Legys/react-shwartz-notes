import React, { Component } from 'react';
import Button from "../../../components/ui/Button/Button";
import classes from "./ContactData.css";
import Spinner from '../../../components/ui/Spinner/Spinner'
import axios from 'axios'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    console.log(this.props)
    const orderObj = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Alexandr Dubrovin',
        country: 'Ukraine',
        email: 'kek@ya.ru'
      },
      deliveryMethods: 'fastest'
    }
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('/orders.json', orderObj)
        this.props.history.push('/')
        resolve(response)
      } catch (error) {
        reject(error)
      } finally {
        this.setState({ loading: false })
      }
    })

  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button
          btnType="Success"
          onClick={this.orderHandler}
        >Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;