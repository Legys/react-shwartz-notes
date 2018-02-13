import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const purchaseBurgerSuccess = (id, orderedData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderedData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post("/orders.json", orderData);
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};
export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return async dispatch => {
    try {
      dispatch(fetchOrderStart());
      const response = await axios.get("/orders.json");
      const fetchedOrders = [];
      Object.keys(response.data).forEach(key => {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      });
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
      throw error;
    } finally {
      // this.setState({ loading: false });
    }
  };
};
