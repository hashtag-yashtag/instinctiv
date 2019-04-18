import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row, Button, Card } from 'reactstrap';
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
  }

  componentWillUnmount() {
    this.users();
  }

  renderUserBoard(leader, id){
    var row = document.createElement('tr');
    row.setAttribute('user',leader.data().username);
    var name = document.createElement('td');
    name.textContent = leader.data().username;
    var mail = document.createElement('td');
    mail.textContent = leader.data().email;
    var add = document.createElement('Input');
    add.setAttribute("type","checkbox");
    //add.setAttribute("id",leader.data().username+"check");
    if(leader.data().roles && leader.data().roles.ADMIN=='ADMIN'){
      add.setAttribute('checked',true);
    }
    //console.log(leader.data().roles.ADMIN);
    add.addEventListener('click',(e)=>{
      e.stopPropagation();
      console.log(add.checked);
      var adminStr = add.checked?'ADMIN':'';
      this.props.firebase.db.collection("Users").doc(id).update({
        "roles.ADMIN": adminStr,
      })
    });


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
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Admin</th>
                  </tr>
                </thead>
              <tbody id="users">

              </tbody>
              </Table>
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

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(Admin);
