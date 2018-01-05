import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'

export default class extends Component {
  state = {
    showSideDraw: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDraw: false })
  }
  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDraw: !prevState.toggleSideDrawer }
    })
  }
  render() {
    return (
      <Aux>
        <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer open={this.state.showSideDraw} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }

};
