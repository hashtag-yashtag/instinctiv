import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row } from 'reactstrap';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';

import BootstrapTable from 'react-bootstrap-table-next';


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
          <Row>
            <Col sm="5"></Col>
            <Col sm="3">
              <h3>Popular Stocks</h3>
              <Table>

                <thead>
          <tr>
            <th>Stocks Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>AAPL</th>
          </tr>
          <tr>
            <th>MSFT</th>
          </tr>
          <tr>
            <th>TWTR</th>
          </tr>
        </tbody>
              </Table>
            </Col>
            <Col sm="4">
              <BootstrapTable keyField='id' data={ this.state.bets } columns={ this.state.betsCol } />

            </Col>
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
