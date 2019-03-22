import React,  { Component }  from 'react';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import { Alert, Table, Card, Col, Row, Button } from 'reactstrap';

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

    this.bets = db.collection("Bets").where('userDoc', '==',  db.collection('Users').doc(this.props.firebase.auth.O)).onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      document.getElementById("bodyBets").innerHTML = "";
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

  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
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
  componentWillUnmount() {
    this.bets();
  }

  renderBets(bet, index) {
    //var db = this.props.firebase.db;
    var row = document.createElement('tr');
    row.setAttribute('id', bet.id+':'+bet.data().bet);
    var stockIdTD = document.createElement('td');
    stockIdTD.textContent = bet.data().stockId;
    var betTD = document.createElement('td');
    betTD.textContent = bet.data().bet;
    var dirTD = document.createElement('td');
    dirTD.textContent = bet.data().direction;
    var delBut = document.createElement('button');
    delBut.addEventListener('click',(e)=>{
      e.stopPropagation();
      var id = e.target.parentElement.getAttribute('id');
      console.log(id);
      this.props.firebase.db.collection('Users').doc(this.props.firebase.auth.O).update({
        balance: this.state.balance + (+ id.substring(id.indexOf(':')+1)),
      });
      this.props.firebase.db.collection("Bets").doc(id.substring(0, id.indexOf(':'))).delete();
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
            <body id="body" class="light-mode">
            <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
            <Row>
            <Col sm="4">
            <Card body outline color="primary">
            <img alt='' src={authUser.photoURL || 'https://goo.gl/Fz9nrQ'}/>

                <Card body outline color="info">
                 <h3><button>Buy Tokens</button></h3>
               </Card>                <Alert color="primary">
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
            </Card>
          </Col>

          <Col sm="5">
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

            <Col sm="3">
               <Card body outline color="info">
                 <h3><strong>Change Password</strong></h3>
                 <PasswordChangeForm />
               </Card>
               </Col>
              </Row>
            </body>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
