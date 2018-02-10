import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";

axios.defaults.baseURL = "https://burger-builder-70d11.firebaseio.com/";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
