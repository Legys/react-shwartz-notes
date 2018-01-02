import React, { Component } from "react";
import ValidationComponent from "./components/ValidationComponent/ValidationComponent";
import CharComponent from "./components/CharComponent/CharComponent";
import "./App.css";

class App extends Component {
  state = {
    string: ""
  };
  handleInput = event => {
    console.log(event.target.value);
    this.setState({
      string: event.target.value
    });
  };
  clearText = () => {
    this.setState({ string: "" });
  };

  render() {
    const charsArray = this.state.string.split("");
    return (
      <div className="App">
        <input
          type="text"
          onChange={this.handleInput}
          value={this.state.string}
        />
        <p>{this.state.string.length}</p>
        <ValidationComponent string={this.state.string} />
        {charsArray.map((char, i) => (
          <CharComponent click={this.clearText} char={char} key={i} />
        ))}
      </div>
    );
  }
}

export default App;
