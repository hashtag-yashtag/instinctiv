<<<<<<< HEAD
import {toggleDarkLight} from '../Home'
import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import {Button} from 'reactstrap';

=======
import React,  { Component }  from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
<<<<<<< HEAD
import { Table, Button } from 'reactstrap';
>>>>>>> bf936d23a353427159960f6eb17d5a190f150177
=======
import { Alert, Table, Card, Col, Row, CardText } from 'reactstrap';
>>>>>>> 73e05bc2ded05f0f67e50f49386f7f2e5e7a9ae9

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
<<<<<<< HEAD

<<<<<<< HEAD
const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    </div>
    )}
  </AuthUserContext.Consumer>
);
=======
=======
>>>>>>> 73e05bc2ded05f0f67e50f49386f7f2e5e7a9ae9
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
        email: docSnapshot.data().email,
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
    
  }


  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
          <div>
            <Row>
            <Col sm="4">
            <Card body outline color="primary">
            <img alt='' src={authUser.photoURL || 'https://goo.gl/Fz9nrQ'}/>
            <CardText>

                <Alert color="primary">
                <strong>Email: {this.state.email}</strong>
                  </Alert>

                <Alert color="info">
                 <strong>Username: {this.state.username}</strong>
                  </Alert>

                  <Alert color="warning">
                  <strong> Balance: {this.state.balance}</strong>
                    </Alert>

                    <Alert color="success">
                    <strong> Accuracy: {this.state.accuracy}</strong>
                      </Alert>
          </CardText>
            </Card>
          </Col>

          <Col sm="4">
             <Card body outline color="warning">
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

            </Card>
            </Col>

            <Col sm="4">
               <Card body outline color="info">
                 <h3><strong>Change Password</strong></h3>
                 <PasswordChangeForm />
               </Card>
               </Col>
              </Row>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
<<<<<<< HEAD
>>>>>>> bf936d23a353427159960f6eb17d5a190f150177
=======
>>>>>>> 73e05bc2ded05f0f67e50f49386f7f2e5e7a9ae9

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
