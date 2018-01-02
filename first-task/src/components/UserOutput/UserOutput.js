import React from "react";
import "./UserOutput.css";

export default props => {
  return (
    <div className="UserOutput">
      <p>My name is {props.name}</p>
      <p>and nickname is {props.nickName}</p>
      <p>I'm buaetiful</p>
    </div>
  );
};
