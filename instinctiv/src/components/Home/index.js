import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { Alert, Table, Card, Col, Row, CardText, Button } from 'reactstrap';
//import {Button, Input, Label} from 'reactstrap';
import './home.css';
import 'react-autocomplete-input/dist/bundle.css'
import Autocomplete from "./Autocomplete"


class HomePage extends Component {

  constructor(){
    super();
    this.state = {
      authUser: null,
      balance: '',

    }
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmitStock = this.handleSubmitStock.bind(this);
  }

  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }

  async componentDidMount() {
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
    //get collection for stocks per user

    this.favs = db.collection("Users").doc(this.props.firebase.auth.O).collection("favorites").onSnapshot(querySnapshot=> {
      querySnapshot.forEach(element => {
        this.renderFavorites(element, element.id);
    });
    })


    this.leaders = db.collection("Users").orderBy('accuracy', 'desc').limit(5).onSnapshot(querySnapshot=> {
      document.getElementById("leaders").innerHTML = "";
      querySnapshot.forEach(element => {
        this.renderLeaderBoard(element, element.id);
      });
    })

    this.stocks = db.collection("Stocks").orderBy('nOfBets', 'desc').limit(5).onSnapshot(querySnapshot=> {
      document.getElementById("bodyPopStocks").innerHTML = "";
      querySnapshot.forEach(element => {
        this.renderPopularStocks(element, element.id);
      });
    })

  }

  componentWillUnmount() {
    this.favs();
    this.leaders();
  }


  renderLeaderBoard(leader, id){
    var row = document.createElement('tr');
    var leaderTD = document.createElement('td');
    leaderTD.textContent = leader.data().username;
    var accuracyTD = document.createElement('td');
    accuracyTD.textContent = leader.data().accuracy;

    row.appendChild(leaderTD);
    row.appendChild(accuracyTD);
    document.getElementById("leaders").appendChild(row);

  }


  renderPopularStocks(leader, id){
    var row = document.createElement('tr');
    var leaderTD = document.createElement('td');
    leaderTD.textContent = leader.data().name;
    var accuracyTD = document.createElement('td');
    accuracyTD.textContent = leader.data().nOfBets;

    row.appendChild(leaderTD);
    row.appendChild(accuracyTD);
    document.getElementById("bodyPopStocks").appendChild(row);

  }

  renderFavorites(ticker, id){
    var row = document.createElement('tr');
    row.setAttribute('id', id);
    var ticker1 = document.createElement('td');
    ticker1.textContent = ticker.data().Ticker;
    var price = document.createElement('td');
    price.textContent = ticker.data().price;

    row.appendChild(ticker1);
    row.appendChild(price);
    document.getElementById("favs").appendChild(row);

  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
      <div>
        <body id="body" class="light-mode">
        <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
        <div className="home-page">
        <Row>
          <Col sm="4">
            <h1>Hi, {this.state.username}!</h1>
          </Col>
          <Col sm="4">
            <Alert color="primary">
              Token Balance: {this.state.balance}
            </Alert>
          </Col>
        </Row>
        </div>
        <Row>
        <Col sm="6">
          <h3>Favorites</h3>
                <Card body outline color="info">


                <CardText>
              <Table>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody id ="favs">

                </tbody>
              </Table>
            </CardText>
            </Card>
            </Col>

          <Col sm="6">

              <h3>Leaderboard</h3>
                <Card body outline color="info">
                  <CardText>
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody id="leaders">

                </tbody>
              </Table>
            </CardText>
            </Card>
          </Col>
          <Col sm="6">
            <h3>Popular Stocks</h3>
              <Card body outline color="info">
                <CardText>
            <Table>

              <thead>
        <tr>
          <th>Stocks Name</th>

          <th># of bets</th>
        </tr>
      </thead>
      <tbody id="bodyPopStocks">
        
      </tbody>
            </Table>
            </CardText>
          </Card>
          </Col>
          <Col sm="12">
          <div className="stock-chart">
            <h3>Chart</h3>
            <TradingViewWidget
              symbol="AMZN"
              theme={Themes.LIGHT}
              locale="en"
            />

          </div>
        </Col>
        </Row>

            <div id="news">

            </div>
          </body>
        </div>
      )}
      </AuthUserContext.Consumer>
    );

  }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
