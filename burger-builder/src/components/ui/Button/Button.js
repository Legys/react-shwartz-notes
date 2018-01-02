import React from "react";

import classes from "./Button.css";

export default props => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
