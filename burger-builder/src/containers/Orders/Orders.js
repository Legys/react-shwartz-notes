import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  async componentDidMount() {
    try {
      const response = await axios.get("/orders.json");
      const fetchedOrders = [];
      Object.keys(response.data).forEach(key => {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      });
      this.setState({ orders: fetchedOrders });
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            price={order.price}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
