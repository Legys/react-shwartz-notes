import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout'
import Orders from "./containters/Orders/../../containers/Orders/Orders";

import { Switch, Route, BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route render={() => <h1>Wrong page</h1>} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
