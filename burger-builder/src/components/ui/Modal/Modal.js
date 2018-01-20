import React, { Component } from "react";

import classes from "./Modal.css";
import Backdrop from "../../ui/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || this.props.children !== this.props.children
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('modal will update')
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} onClick={this.props.closed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}


export default Modal;
