import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { Alert } from 'reactstrap';
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { Table } from 'reactstrap';
//import {Button, Input, Label} from 'reactstrap';
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
/* 
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
      child.innerHTML 



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
} */

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
    var db = this.props.firebase.db;
    //get collection for stocks per user
    
    db.collection("Users").doc(this.props.firebase.auth.O).collection("favorites").onSnapshot(querySnapshot=> {
      querySnapshot.forEach(element => {
        this.renderFavorites(element, element.id);
    });

    })

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
            </div>

            <div className="float-left">
              <h3>Leaderboard</h3>
              <Table>
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
