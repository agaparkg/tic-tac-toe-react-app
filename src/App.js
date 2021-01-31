import React, { Component } from "react";
import "./App.css";

const winComb = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [1, 5, 9],
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayer: "X",
      winner: "",
      contents: [],
      winArr: winComb,
    };
  }

  handleWinCombUpdate = (id, turn) => {
    const newWinComb = JSON.parse(JSON.stringify(this.state.winArr));
    newWinComb.forEach((arr) => {
      if (arr.includes(id)) {
        arr[arr.indexOf(id)] = turn;
      }
    });

    const result = newWinComb.map((arr) => {
      if (arr.every((item) => item === "X")) {
        return "X";
      } else if (arr.every((item) => item === "O")) {
        return "O";
      } else {
        return "";
      }
    });

    const winner = result.filter((item) => item).length
      ? result.filter((item) => item)[0]
      : "";
    this.setState({ winArr: newWinComb, winner });
  };

  handleBoxClick = (e) => {
    const { activePlayer } = this.state;
    const id = +e.target.id;
    const newContents = [...this.state.contents];
    if (!newContents[id - 1]) {
      newContents[id - 1] = activePlayer;
      this.handleWinCombUpdate(id, activePlayer);
      this.setState({
        contents: newContents,
        activePlayer: activePlayer === "X" ? "O" : "X",
      });
    }
  };

  handleGameReset = () => {
    this.setState({
      winArr: winComb,
      contents: [],
      winner: "",
      activePlayer: "X",
    });
  };

  render() {
    const { activePlayer, winner, contents } = this.state;
    let result, customCl;
    if (winner.length === 1) {
      result = "Winner is " + winner;
      customCl = "success";
    }
    if (winner === "" && contents.filter((item) => item).length === 9) {
      result = "No winner. It's a draw!";
      customCl = "draw";
    }
    return (
      <div className="App">
        <div id="board">
          <div className="rows">
            <div onClick={this.handleBoxClick} className="columns" id="1">
              {contents[0]}
            </div>
            <div onClick={this.handleBoxClick} className="columns" id="2">
              {contents[1]}
            </div>
            <div onClick={this.handleBoxClick} className="columns" id="3">
              {contents[2]}
            </div>
          </div>
          <div className="rows">
            <div onClick={this.handleBoxClick} className="columns" id="4">
              {contents[3]}
            </div>
            <div onClick={this.handleBoxClick} className="columns" id="5">
              {contents[4]}
            </div>
            <div onClick={this.handleBoxClick} className="columns" id="6">
              {contents[5]}
            </div>
          </div>
          <div className="rows">
            <div onClick={this.handleBoxClick} className="columns" id="7">
              {contents[6]}
            </div>
            <div onClick={this.handleBoxClick} className="columns" id="8">
              {contents[7]}
            </div>
            <div onClick={this.handleBoxClick} className="columns" id="9">
              {contents[8]}
            </div>
          </div>
        </div>
        <div>Current Player: {activePlayer}</div>
        <div className={customCl}>
          {result}
          <div>
            <button onClick={this.handleGameReset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
