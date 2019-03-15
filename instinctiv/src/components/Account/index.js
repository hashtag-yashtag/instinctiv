import React,  { Component }  from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import { Table, Button } from 'reactstrap';

class Account extends Component {
  constructor(props){
    super(props);
    this.db = this.props.firebase.db;
    this.state = {
      betsList: [],
      authUser: null,
      balance: 0,
      email: '',
      accuracy: 0,
    }
    var db = this.props.firebase.db;

    db.collection("Bets").where('userDoc', '==',  db.collection('Users').doc(this.props.firebase.auth.O)).onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      querySnapshot.forEach(element => {
          this.renderBets(element, element.id);
        //element.data().id = element.id;
        this.state.betsList.push(element.data());
      });
      console.log(querySnapshot, this.state.betsList);
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  componentDidMount() {
    var db = this.props.firebase.db;
    db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
      //console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
      this.setState({
        balance: docSnapshot.data().balance,
        username: docSnapshot.data().username,
        betsList: this.state.betsList,
        authUser: docSnapshot.data(),
        email: docSnapshot.data(). email,
        accuracy:docSnapshot.data().accuracy,
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });


  }

  renderBets(bet, index) {
    //var db = this.props.firebase.db;
    var row = document.createElement('tr');
    row.setAttribute('id', bet.id);
    var stockIdTD = document.createElement('td');
    stockIdTD.textContent = bet.data().stockId;
    var betTD = document.createElement('td');
    betTD.textContent = bet.data().bet;
    var dirTD = document.createElement('td');
    dirTD.textContent = bet.data().direction;
    var del = document.createElement('td');
    var delBut = document.createElement('button');
    delBut.addEventListener('click',(e)=>{
      e.stopPropagation();
      console.log(e.target.parentElement.getAttribute('id'));
      this.props.firebase.db.collection("Bets").doc(e.target.parentElement.getAttribute('id')).delete();
      document.getElementById("bodyBets").innerHTML = "";
    });
    delBut.textContent = 'X';
    //del.appendChild(delBut);
    row.appendChild(stockIdTD);
    row.appendChild(betTD);
    row.appendChild(dirTD);
    row.appendChild(delBut);
    
    document.getElementById("bodyBets").appendChild(row);
    /* 
    function removeBet(){
      //db.collection("Bets").doc(id).delete();

      console.log(5, 'clicked')
    }
     */
    /* (
      <tr key={index} >
        <td>{bet.stockId}</td>
        <td>{bet.bet}</td>
        <td>{bet.direction}</td>
        <td>
          <button className="btn btn-secondary btn-sm" id="delete" onClick={removeBet} color="primary">
          X
          </button>
        </td>
      </tr>
    ) */
  }

  handleDel(){
    //e.preventDefault();
    //onClick="handleDeleteBet()"bet.id   {this.state.betsList.map(this.renderBets)}
    console.log('here'/* id */);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
          <div>
            <h2>Email: {this.state.email}</h2>
            <h2>Username: {this.state.username}</h2>
            <h3>Balance: {this.state.balance}</h3>
            <h3>Accuracy: {this.state.accuracy}</h3>
            <img  src={authUser.photoURL} />
            <Table striped hover>
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Tokens Bet</th>
                  <th>Up/Down</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id='bodyBets'>
                
              </tbody>
            </Table>
            <PasswordChangeForm />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);