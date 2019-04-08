import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row } from 'reactstrap';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';



class Admin extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <p>
            Restricted area! Only users with the admin role are authorized.
          </p>
          <Row>
            <Col sm="8"></Col>
            <Col sm="4">
              <h3>Most Betted on</h3>
          <Table>
              <thead>
                <tr>
                  <th>Stocks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>AAPL</th>
                </tr>
                <tr>
                  <th>FB</th>
                </tr>
                <tr>
                  <th>MSFT</th>
                </tr>
              </tbody>
            </Table>
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