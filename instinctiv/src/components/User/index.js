import React, { Component } from "react";
import { Alert, Table, Card, Col, Row, CardText, Button } from 'reactstrap';
import { withAuthorization } from '../Session';


class User extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: this.props.match.params.name,
      email: '',
      photoURL: '',
      accuracy: 0,
    }

    this.bets = this.props.firebase.db.collection("Bets").where('username', '==', this.props.match.params.name).onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      document.getElementById("bodyBets").innerHTML = "";
      querySnapshot.forEach(element => {
          this.renderBets(element, element.id);
        //element.data().id = element.id;
        //this.state.betsList.push(element.data());
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
    //del.appendChild(delBut);
    row.appendChild(stockIdTD);
    row.appendChild(betTD);
    row.appendChild(dirTD);

    document.getElementById("bodyBets").appendChild(row);

  }

  componentDidMount() {
    this.props.firebase.db.collection("Users").where('username', '==', this.props.match.params.name)
                                                    .limit(1).onSnapshot(querySnapshot => {

      querySnapshot.forEach(docSnapshot => {
        console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data);
        this.setState({
          username: this.props.match.params.name,
          email: docSnapshot.data().email,
          photoURL: docSnapshot.data().photoURL,
          accuracy: docSnapshot.data().accuracy,
        });      // ...
      });

    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  componentWillUnmount() {
    this.bets();
  }

  render() {
    return (
      <div>
        <body id="body" class="light-mode">
        <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
        <Row>
          <Col sm="4">
            <Card body outline color="primary">
              <img alt='' src={this.state.photoURL || 'https://goo.gl/Fz9nrQ'}/>
              <CardText>
                  <Alert color="primary">
                  <strong>Email: {this.state.email}</strong>
                    </Alert>

                  <Alert color="info">
                  <strong>Username: {this.state.username}</strong>
                    </Alert>
                    {/*
                    <Alert color="warning">
                    <strong> Balance: {this.state.balance}</strong>
                      </Alert> */}

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
                </tr>
              </thead>
              <tbody id='bodyBets'>

              </tbody>
            </Table>

            </Card>
          </Col>

        </Row>
      </body>
      </div>
    )
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(User);
