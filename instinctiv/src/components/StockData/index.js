import React, {Component} from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import { Table, Col, Row, Button, Card, Input } from 'reactstrap';
import { withFirebase } from '../Firebase';
import DonutChart from 'react-donut-chart';

import { compose } from 'recompose';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class StockData extends Component {

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
      dataPie: [],
    };
  }
  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }

 handleUser(e){
  e.preventDefault();
  var user = document.getElementById('user').value;
  this.users = this.props.firebase.db.collection("Bets")
                .where('username', '==', user)
                .orderBy('stockId','asc')
                .onSnapshot(querySnapshot => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);
    document.getElementById("usersBets").innerHTML = "";
    var currentStock = '';
    var mapIndex = -1;
    querySnapshot.forEach(element => {
      if(currentStock != element.data().stockId){
        mapIndex++;
        this.state.dataPie.push({
          label: element.data().stockId,
          value: 0,
        });

      }
        currentStock = element.data().stockId;
        this.renderUserBets(element, element.id, mapIndex);
      //element.data().id = element.id;
      //this.state.betsList.push(element.data());
    });
    console.log(querySnapshot);
  }, err => {
    console.log(`Encountered error: ${err}`);
  });

 }

 renderUserBets(bet, index, mapIndex) {
   //var db = this.props.firebase.db;
   var row = document.createElement('tr');
   this.state.dataPie[mapIndex].value++;
   row.setAttribute('id', bet.id);
   var stockIdTD = document.createElement('td');
   stockIdTD.textContent = bet.data().stockId;
   var betTD = document.createElement('td');
   betTD.textContent = bet.data().bet;
   var dirTD = document.createElement('td');
   dirTD.textContent = bet.data().direction;
   //del.appendChild(delBut);
   row.appendChild(stockIdTD);
   row.appendChild(betTD);
   row.appendChild(dirTD);

   document.getElementById("usersBets").appendChild(row);
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
    var user = document.getElementById('user').value;
    this.users = this.props.firebase.db.collection("Bets")
                .where('username', '==', user)
                .orderBy('stockId','asc')
                .onSnapshot(querySnapshot => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);
    document.getElementById("usersBets").innerHTML = "";
    var currentStock = '';
    var mapIndex = -1;
    querySnapshot.forEach(element => {
      if(currentStock != element.data().stockId){
        mapIndex++;
        this.state.dataPie.push({
          label: element.data().stockId,
          value: 0,
        });

      }
        currentStock = element.data().stockId;
        this.renderUserBets(element, element.id, mapIndex);
      //element.data().id = element.id;
      //this.state.betsList.push(element.data());
    });
    console.log(querySnapshot);
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
  }

  componentWillUnmount() {
    this.bets();
    //this.users();
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
        <body id="body" class="light-mode">
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
          <Row>
            <Col sm="6">
              <div className="home-page">
            <h2>Stock Database</h2>
            </div>
             <Card body outline color="primary">
              <BootstrapTable keyField='id' data={ this.state.bets } columns={ this.state.betsCol } pagination={ paginationFactory() } />
              </Card>
            </Col>
            <Col sm="6">
              <div className="home-page">
            <h2>Bets for specific User </h2>
            </div>
             <Card body outline color="primary">
             <Input type="text" name="user" id="user" placeholder="Enter a user to search"/>
             <Button color = "success" block size="lg" id="up" onClick={this.handleUser.bind(this)} type="submit"> Search </Button>
              <Table>
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Bet</th>
                    <th>Direction</th>
                  </tr>
                </thead>
              <tbody id="usersBets">

              </tbody>
              </Table>
            </Card>
            <DonutChart data = {this.state.dataPie} />
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
)(StockData);
