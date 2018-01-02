import React from "react";

const st = {
  margin: "10px auto",
  display: "block",
  border: "1px solid green",
  padding: "15px",
  color: "grey"
};

export default props => {
  return (
    <input
      type="text"
      style={st}
      onChange={props.change}
      value={props.userName}
    />
  );
};
