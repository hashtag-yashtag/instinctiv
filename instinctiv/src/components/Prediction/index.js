import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row, Button, Card } from 'reactstrap';
import { withFirebase } from '../Firebase';
import DonutChart from 'react-donut-chart';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const dataPie = [
    {label:'AAPL', value: 25},
    {label:'MSFT', value: 15},
    {label:'ADBE', value: 5},
    {label:'TSLA', value: 20},
    {label:'AAL', value: 30},
    {label:'FB', value: 5}
  ]

class Prediction extends Component {
  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass === "dark-mode" ? "light-mode" : "dark-mode";
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
            </Col>
            <Col sm="6">
              <div className="home-page">
            <h2>Prediction Database</h2>
            </div>
            <DonutChart data = {dataPie} />
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
)(Prediction);
