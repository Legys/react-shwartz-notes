import React from "react";

export default props => {
  return (
    <div>
      {props.string.length >= 5 ? "Text long enough" : "Text too short"}
    </div>
  );
};
