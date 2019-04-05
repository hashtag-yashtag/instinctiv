import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import {Table, Row, Col} from 'reactstrap';

const Admin = () => (
  <div>
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
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Admin);
