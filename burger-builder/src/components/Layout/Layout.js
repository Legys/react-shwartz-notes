import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";

export default props => {
  return (
    <Aux>
      <div>Toolbar, SideDrwaer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
