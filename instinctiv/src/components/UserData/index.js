import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row, Button, Card } from 'reactstrap';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class UserData extends Component {

  constructor(props){
    super(props);
    this.state = {
      betsCol: [{
        dataField: 'stockId',
        text: 'Stock ID',
        sort: true
      }, {
        dataField: 'bet',
        text: 'Tokens Bet',
        sort: true
      }, {
        dataField: 'username',
        text: 'User',
        sort: true
      }, {
        dataField: 'direction',
        text: 'Direction'
      }],
      bets: [],
    };
  }
  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass === "dark-mode" ? "light-mode" : "dark-mode";
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
    var db = this.props.firebase.db;
    this.users = db.collection("Users").orderBy('username', 'asc').limit(20).onSnapshot(querySnapshot=> {
      document.getElementById("users").innerHTML = "";
      querySnapshot.forEach(element => {
        this.renderUserBoard(element, element.id);
      });
    })
    this.bets = this.props.firebase.db.collection("Bets").onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      this.setState({
        bets: [],
      })
      querySnapshot.forEach(element => {
        this.state.bets.push({
          id: element.id,
          stockId:element.data().stockId,
          bet: element.data().bet,
          username: element.data().username,
          direction: element.data().direction,
        });
        this.setState({
          bets: this.state.bets,
        })
      });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  componentWillUnmount() {
    this.bets();
    this.users();
  }

  renderUserBoard(leader, id){
    var row = document.createElement('tr');
    var name = document.createElement('td');
    name.textContent = leader.data().username;
    var mail = document.createElement('td');
    mail.textContent = leader.data().email;
    var add = document.createElement('Button');
    add.innerHTML = 'Add';
    add.style.color = 'blue';


    row.appendChild(name);
    row.appendChild(mail);
    row.appendChild(add)
    document.getElementById("users").appendChild(row);

  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
        <body id="body" class="light-mode">
        <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
          <Row>
            <Col sm="3">
            <div className="back">
            </div>
            </Col>
            <Col sm="6">
              <div className="home-page">
            <h2>User Database</h2>
            </div>
             <Card body outline color="primary">
              <Table>
              <tbody id="users">

              </tbody>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody id='userBody'>
                <tr>


         </tr>
         <tr>
         </tr>
                </tbody>
              </Table>
            </Card>
            </Col>
            <Col sm="3"></Col>
            </Row>
            </body>
        </div>
      )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(UserData);
