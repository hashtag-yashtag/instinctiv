<<<<<<< HEAD
import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { Alert, Label, Input } from 'reactstrap';
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { Table } from 'reactstrap';
import {Button} from 'reactstrap';
import './home.css';
import { render } from 'react-dom'

const SYMBOL = '01. symbol'
const OPEN_PRICE = '02. open'
const HIGH_PRICE = '03. high'
const LOW_PRICE = '04. low'
const CURRENT_PRICE = '05. price'

var stocksList = [
  {ticker:'AAPL', price: ''},
  {ticker:'MSFT', price: ''},
  {ticker:'TSLA', price: ''},
  {ticker:'FB', price: ''},
  {ticker:'NFLX', price: ''}
];

var alphaKey = '2U48DC45SZ4PJT3U'

async function getStockPrices() {
  for (var stock of stocksList) {
    //Comment out for actual values
    // var alphaURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stock.ticker+'&apikey='+alphaKey;

    //Comment out for dummy values
    var alphaURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo'

    stock.price = await fetch(alphaURL).then(
      response => response.json()).then(
        data => {
          console.log(data)
          return data['Global Quote'][CURRENT_PRICE];
        }
    )
    stock.ticker = await fetch(alphaURL).then(
      response => response.json()).then(
        data => {
          console.log(data)
          return data['Global Quote'][SYMBOL];
        }
    )
    console.log(stock.price);
    console.log(stocksList);
  }
}



function viewNews(ticker) {
  document.getElementById('news').innerHTML ='';
  var stock = ticker;
  var url = 'https://newsapi.org/v2/everything?q='
            + stock  +
            '&apiKey=34c665fbab834d7c80356f0bf458b1a7';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

    for(var i=0; i < 12; i++){

      var title = data.articles[i].title;

      if(title == null){
        title ="";
      }
      var desc = data.articles[i].description;
      var auth = data.articles[i].author;
      var link = data.articles[i].url;
      var link1 = data.articles[i].urlToImage;
      var date = data.articles[i].publishedAt;
/*
      var child = document.createElement('div');
      child.innerHTML */



    document.getElementById('news').innerHTML += '<div class="item"><h2 class="header">' + title + '</h2>' +
               //character of escape: "quotes" and '+'
      '<img src="' + link1 +'">' +
      '<p class="publishedAt">' + date + '</p>' +
      '<p>' + desc + '</p>' +
      '<p>' + auth + '</p>' +
               //character of escape: "quotes" and '+'
      '<a href="'+ link +'">Read more</a></div>'
      ;
      }
  });
}

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
    await getStockPrices();//Do this at end
    /*
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).get().then(data => {
        this.setState({data: data});
        console.log(data.data());
        this.setState({
          balance: data.data().balance,
          username: data.data().username
        })
      }
    ) */
  }

  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
      <div>
        <body id="body" class="light-mode">
        <div className="home-page">
          <h1>Welcome to Instinctiv, {this.state.username}</h1>
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
          <p>The Home Page is accessible by every signed in user.</p>
            <div className="row">
                <div className="column small-centered small-11 medium-6 large-5">

                    <Input type="text" name="Search" placeholder="Search..." />

            <div className="float-center">
              <Alert color="primary">
                Token Balance: {this.state.balance}
              </Alert>


              <form onSubmit={this.handleSubmit}>
                <Label for="Stock">Stock</Label>
                <Input type="text" name="StockID" id="stock" placeholder="Enter a Stock ID" />
                <Input type="number" name="tokens" id="tokens" placeholder="Enter a amount to bet" />
                <Button color="primary" size="lg" block>Submit</Button>

              </form>
                </div>
            </div>
          </div>
        </div>
            <div className="float-right">

                <h3>Favorites</h3>

              <Table stripped>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="float-left">
              <h3>Leaderboard</h3>
              <Table stripped>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alpha</td>
                    <td>95.33%</td>
                  </tr>
                  <tr>
                    <td>Beta</td>
                    <td>92.1%</td>
                  </tr>
                  <tr>
                    <td>Gamma</td>
                    <td>75.66%</td>
                  </tr>
                  <tr>
                    <td>Delta</td>
                    <td>72.54%</td>
                  </tr>
                  <tr>
                    <td>Epsilon</td>
                    <td>56.5%</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="stock-chart">
              <TradingViewWidget
                symbol="AMZN"
                theme={Themes.LIGHT}
                locale="en"
              />

            </div>
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
=======
import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { Alert } from 'reactstrap';
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { Table } from 'reactstrap';
<<<<<<< HEAD
import { Collapse, Button, CardBody, Card } from 'reactstrap';
=======
import {Button, Input, Label} from 'reactstrap';
>>>>>>> 73e05bc2ded05f0f67e50f49386f7f2e5e7a9ae9
import './home.css';
import 'react-autocomplete-input/dist/bundle.css'
import Autocomplete from "./Autocomplete"

/* 
const SYMBOL = '01. symbol'
const OPEN_PRICE = '02. open'
const HIGH_PRICE = '03. high'
const LOW_PRICE = '04. low' 
const CURRENT_PRICE = '05. price'


var stocksList = [
  {ticker:'AAPL', price: ''},
  {ticker:'MSFT', price: ''},
  {ticker:'TSLA', price: ''},
  {ticker:'FB', price: ''},
  {ticker:'NFLX', price: ''}
];*/

var stockSearchList = []
var userSearchList = []

//var alphaKey = '2U48DC45SZ4PJT3U'

/* async function getStockPrices() {
  for (var stock of stocksList) {
    //Comment out for actual values
    // var alphaURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stock.ticker+'&apikey='+alphaKey;

    //Comment out for dummy values
    var alphaURL = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo'

    stock.price = await fetch(alphaURL).then(
      response => response.json()).then(
        data => {
          return data['Global Quote'][CURRENT_PRICE];
        }
    )
    stock.ticker = await fetch(alphaURL).then(
      response => response.json()).then(
        data => {
          return data['Global Quote'][SYMBOL];
        }
    )
    console.log(stock.price);
    console.log(stocksList);
  }
} */

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

  async componentDidMount() {
    stockSearchList = []
    userSearchList = []
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
      this.setState({
        balance: docSnapshot.data().balance,
        username: docSnapshot.data().username
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    await this.props.firebase.db.collection("Stocks").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          stockSearchList.push(doc.data()['ticker'] + ": " + doc.data()['name'])
      });
    });

    await this.props.firebase.db.collection("Users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          userSearchList.push(doc.data()['username']);
      });
    });
  }


  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
      <div>

        <div className="home-page">
          <h1>Welcome to Instinctiv, {this.state.username}</h1>

          <p>The Home Page is accessible by every signed in user.</p>
            <div className="row">
                <div className="column small-centered small-11 medium-6 large-5">
                  <Autocomplete suggestions={stockSearchList} userSuggestions={userSearchList} />

              <div className="float-center">
              <Alert color="primary">
                Token Balance: {this.state.balance}
              </Alert>
                </div>
            </div>
          </div>
        </div>
            <div className="float-right">

                <h3>Favorites</h3>

              <Table stripped>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                  <tr>
                    <td>stock</td>
                    <td>price</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="float-left">
              <h3>Leaderboard</h3>
              <Table stripped>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alpha</td>
                    <td>95.33%</td>
                  </tr>
                  <tr>
                    <td>Beta</td>
                    <td>92.1%</td>
                  </tr>
                  <tr>
                    <td>Gamma</td>
                    <td>75.66%</td>
                  </tr>
                  <tr>
                    <td>Delta</td>
                    <td>72.54%</td>
                  </tr>
                  <tr>
                    <td>Epsilon</td>
                    <td>56.5%</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="stock-chart">
              <TradingViewWidget
                symbol="AMZN"
                theme={Themes.LIGHT}
                locale="en"
              />

            </div>
            <div id="news">

            </div>
        </div>
      )}
      </AuthUserContext.Consumer>
    );

  }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
>>>>>>> bf936d23a353427159960f6eb17d5a190f150177
