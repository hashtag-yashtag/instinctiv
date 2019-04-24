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



class Prediction extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataPie: [],
    }
  }
  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass === "dark-mode" ? "light-mode" : "dark-mode";
 }

 componentDidMount(){
  this.props.firebase.db.collection("Predictions").onSnapshot(querySnapshot => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);
    var mapIndex = 0;
    querySnapshot.forEach(element => {
      this.state.dataPie.push([]);
      console.log(this.state.dataPie[0]);
      this.state.dataPie[mapIndex].push({
        label: 'UP',
        value: element.data().up,
      });
      this.state.dataPie[mapIndex].push({
        label: 'DOWN',
        value: element.data().down,
      });
      mapIndex++;
    });

    this.setState({
      dataPie: this.state.dataPie,
    })
  });
  this.setState({
    bets: this.state.bets,
  })
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
            <h2>AAPL </h2>
            <DonutChart data = {this.state.dataPie[0]} />
            <h2>ADBE </h2>
            <DonutChart data = {this.state.dataPie[1]} />
            <h2>INTC </h2>
            <DonutChart data = {this.state.dataPie[2]} />
            <h2>MSFT </h2>
            <DonutChart data = {this.state.dataPie[3]} />

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
