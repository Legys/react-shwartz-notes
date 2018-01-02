import React from "react";
const st = {
  display: "inline-block",
  padding: "16px",
  textAlign: "center",
  margin: "16px",
  border: "1px solid black"
};
export default props => {
  return (
    <div style={st} onClick={props.click}>
      {props.char}
    </div>
  );
};
