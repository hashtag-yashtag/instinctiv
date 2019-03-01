import React, { Component } from "react";

class Stocks extends Component {
  state = {
    numberOfTokensLeft: 20
  };

  render() {
    return (
      <div>
        <h1>Stocks</h1>
        <textarea>Search for stocks here</textarea>
        <form>
          <label>
            Betting Up:
            <input name="Tokens" type="number" />
          </label>
          <br />
          <label>
            Betting Down:
            <input name="Tokens:" type="number" />
          </label>
        </form>
        <h9>You can bet with maximum</h9>
        <span className={this.getBadgeClasses()}>
          {this.formatnumberOfTokensLeft()}
        </span>
        <h9> number of tokens.</h9>
        <h9> </h9>
        <button className="btn btn-secondary btn-sm">Bet!</button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.numberOfTokensLeft === 0 ? "warning" : "primary";
    return classes;
  }

  formatnumberOfTokensLeft() {
    const { numberOfTokensLeft } = this.state;
    return numberOfTokensLeft === 0 ? "Zero" : numberOfTokensLeft;
  }
}

export default Stocks;
