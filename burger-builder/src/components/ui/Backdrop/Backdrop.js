import React from "react";

import classes from "./Backdrop.css";

export default props => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.onClick} />
  ) : null;
};
