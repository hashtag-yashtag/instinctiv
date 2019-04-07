import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import {Table, Row, Col} from 'reactstrap';

const Admin = () => (
  <div>
    <Row>
      <Col sm="9"></Col>
      <Col sm="3">
        <h3>Most Betted on</h3>
    <Table>
        <thead>
          <tr>
            <th>Stocks</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>AAPL</th>
            <th>100</th>
          </tr>
          <tr>
            <th>FB</th>
            <th>78</th>
          </tr>
          <tr>
            <th>MSFT</th>
            <th>67</th>
          </tr>
        </tbody>
      </Table>
      </Col>
      </Row>
</div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Admin);
