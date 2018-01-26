import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price
    Array.from(query).forEach(q => {
      if (q[0] === 'price') {
        price = q[1]
      } else {
        ingredients[q[0]] = Number(q[1])
      }
    })
    this.setState({ ingredients, price })
  }
  hanldeCancel = () => {
    this.props.history.goBack()
  }
  handleContinue = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    console.log(this.props.match)
    return (
      < div >
        <CheckoutSummary
          onCancel={this.hanldeCancel}
          onContinue={this.handleContinue}
          ingredients={this.state.ingredients} />
        <Route path={this.props.match.path + '/contact-data'}
          render={(props) => <ContactData {...props}
            price={this.state.price}
            ingredients={this.state.ingredients}
          />}
        />
      </div >
    )
  }
}

export default Checkout;