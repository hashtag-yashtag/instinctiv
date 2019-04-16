import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row, Button } from 'reactstrap';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Admin extends Component {

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
          <Row>
            <Col sm="3">
            <div className="back">
            </div>
            </Col>
            <Col sm="6">
            <h3>User Database</h3>
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
            </Col>
            <Col sm="3"></Col>
            </Row>
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
)(Admin);
