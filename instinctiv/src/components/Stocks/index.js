import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from '../Session';
import { Input } from 'reactstrap';


class Stocks extends Component {

  constructor(props){
    super(props);
    this.state = {
      authUser: null,
      balance: '',

    }
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmitStock = this.handleSubmitStock.bind(this);
  }

  componentDidMount() {
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
      this.setState({
        balance: docSnapshot.data().balance,
        username: docSnapshot.data().username
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Stocks</h1>
          <textarea>Search for stocks here</textarea>
          <form>
            <label>
              Tokens to Bet:
              <Input type="number" name="tokens" id="tokens" placeholder="Enter a amount to bet"/>
              <button className="btn btn-secondary btn-sm" id="up" onClick={this.handleUp.bind(this)}>up</button>
              <button className="btn btn-secondary btn-sm" id="down" onClick={this.handleDown.bind(this)}>dwn</button>
            </label>
          </form>
          <h3>You currently have</h3>
          <span className={this.getBadgeClasses()}>
            {this.formatnumberOfTokensLeft()}
          </span>
          <h9> number of tokens.</h9>
          <h9> </h9>
        </div>
      )}
      </AuthUserContext.Consumer>
    );
  }

  handleUp(e){
    e.preventDefault();
    this.handleSubmit('Up');
    console.log('Up');
  }

  handleDown(e){
    e.preventDefault();
    this.handleSubmit('Down');
    console.log('Down');
  }

  handleSubmit(dir) {
    
    //e.preventDefault();
    var stock = 'temp';//document.getElementById('stock').value;
    var tokens = document.getElementById('tokens').value;
    if(this.state.balance-tokens  >= 0){
      console.log(this.props.firebase.auth.O);
      var userDoc = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O);
      userDoc.set({
        balance: (this.state.balance-tokens)
      }, {merge: true});
      //TODO: bets collection
      this.props.firebase.db.collection("Bets").add({
        userDoc: userDoc,
        stockId: stock,
        direction: dir,
        bet: tokens
      });
    }
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).get().then(data => {
        this.setState({data: data});
        console.log(data.data().balance);
        this.setState({
          balance: data.data().balance,
        })
      }
    )
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.balance === 0 ? "warning" : "primary";
    return classes;
  }

  formatnumberOfTokensLeft() {
    const { balance } = this.state;
    return balance === 0 ? "Zero" : balance;
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Stocks);
