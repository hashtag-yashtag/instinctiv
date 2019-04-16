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
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }


  componentDidMount() {
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
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
        <body id="body" class="light-mode">
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
          <Row>
            <Col sm="3"></Col>
            <Col sm="6">
              <div className="home-page">
            <h2>Stock Database</h2>
            </div>
             <Card body outline color="primary">
              <BootstrapTable keyField='id' data={ this.state.bets } columns={ this.state.betsCol } pagination={ paginationFactory() } />
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
)(Admin);
