import React, { Component } from "react";
import UserInput from "./components/UserInput/UserInput";
import UserOutput from "./components/UserOutput/UserOutput";

class App extends Component {
  state = {
    userName: "Alexandr"
  };

  changeUserName = event => {
    this.setState({
      userName: event.target.value
    });
  };

  render() {
    const myNickname = `[xxx${this.state.userName.toUpperCase()}xxx]`;
    return (
      <div>
        <UserInput
          change={this.changeUserName.bind(this)}
          userName={this.state.userName}
        />
        <UserOutput name="Maxus" nickName="Kekus" />
        <UserOutput name={this.state.userName} nickName={myNickname} />
        <UserOutput name="Anna" nickName="FrancheskaKitty" />
      </div>
    );
  }
}

export default App;
