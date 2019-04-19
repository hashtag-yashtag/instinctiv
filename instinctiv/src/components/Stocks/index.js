import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from '../Session';
import { Input, Button, Col, Row, Label, Card, Alert, CardText, Table } from 'reactstrap';
import './stocks.css';
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
//import { Timestamp } from "@google-cloud/firestore";

class Stocks extends Component {

  constructor(props){
    super(props);
    this.user = null;
    this.state = {
      username: '',
      balance: '',
      stock: this.props.match.params.name,
    }
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmitStock = this.handleSubmitStock.bind(this);
  }

  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }

  componentDidMount() {
    this.user = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
      this.setState({
        balance: docSnapshot.data().balance,
        username: docSnapshot.data().username,
        stock: this.props.match.params.name
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    this.bets = this.props.firebase.db.collection("Bets").where('stockId', '==', this.props.match.params.name).onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      document.getElementById("bodyBets").innerHTML = "";
      querySnapshot.forEach(element => {
          this.renderBets(element, element.id);
        //element.data().id = element.id;
        //this.state.betsList.push(element.data());
      });
      console.log(querySnapshot, this.state.betsList);
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    this.props.firebase.db.collection("Stocks").doc(this.props.match.params.name).onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
      this.setState({
        balance: this.state.balance,
        username: this.state.username,
        address: docSnapshot.data().address,
        ceo: docSnapshot.data().ceo,
        companyURL: docSnapshot.data().companyURL,
        description: docSnapshot.data().description,
        employees: docSnapshot.data().employees,
        name: docSnapshot.data().name,
        price: docSnapshot.data().price,
        stockExchange: docSnapshot.data().stockExchange,
        ticker: docSnapshot.data().ticker,
        time_updated: docSnapshot.data().time_updated,
        nOfBets: docSnapshot.data().nOfBets,
        betsToday: docSnapshot.data().betsToday,
        lastBetDate: docSnapshot.data().lastBetDate,
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
    this.viewNews();

    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).collection("favorites").doc(this.props.match.params.name)
      .get().then(docSnapshot => {
        if(docSnapshot.exists){
          document.getElementById('fav').innerText = 'Un-favorite';
        }
      });
  }

  componentWillUnmount(){
    this.user();
    this.bets();
  }


  renderBets(bet, index) {
    //var db = this.props.firebase.db;
    var row = document.createElement('tr');
    row.setAttribute('id', bet.id);/*
    var stockIdTD = document.createElement('td');
    stockIdTD.textContent = bet.data().stockId; */
    var betTD = document.createElement('td');
    betTD.textContent = bet.data().bet;

    var dirTD = document.createElement('td');
    dirTD.textContent = bet.data().direction;
    //del.appendChild(delBut);
    //row.appendChild(stockIdTD);
    row.appendChild(betTD);
    row.appendChild(dirTD);

    document.getElementById("bodyBets").appendChild(row);

  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <body id="body" class="light-mode">
          <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
          <div>
            <Row>
            <Col sm="5">
              <Card body inverse color="info">
        <CardText>
            <Button color="success" id="fav" onClick={this.handleFavorite.bind(this)} type="submit">Favorite</Button>
            <Alert color="primary">
              <strong>Name: {this.state.name}</strong>
            </Alert>
            <Alert color="info">
              <strong>Address: {this.state.address}</strong><br/>
            </Alert>
            <Alert color="secondary">
              <strong>Ceo: {this.state.ceo}</strong><br/>
            </Alert>
            <Alert color="warning">
              <strong>CompanyURL: {this.state.companyURL}</strong><br/>
            </Alert>
            <Alert color="success">
              <strong>Employees: {this.state.employees}</strong><br/>
            </Alert>
            <Alert color="dark">
              <strong>StockExchange: {this.state.stockExchange}</strong><br/>
            </Alert>
            <Alert color="danger">
              <strong>Price: {this.state.price}</strong><br/>
            </Alert>
            <Alert color="light">
              <strong>TimeUpdated: {this.state.time_updated}</strong><br/>
            </Alert>
        </CardText>
      </Card>
          </Col>
          <Col sm="7">
            <h4>Description</h4>
            <Card body inverse color="info">
      <CardText>
          <Alert color="warning">
            <strong>{this.state.description}</strong><br/>
          </Alert>
      </CardText>
    </Card>
    <h1>Bet</h1>
    <Input type="number" name="tokens" id="tokens" placeholder="Enter a amount to bet"/>
    <Button color = "success" block size="lg" id="up" onClick={this.handleUp.bind(this)} type="submit"> Up </Button>
    <Button color = "danger" block size="lg"id="down" onClick={this.handleDown.bind(this)} type="submit"> Down </Button>

      <h5>You currently have<span className={this.getBadgeClasses()}>
        {this.formatNumberOfTokensLeft()}
      </span> number of tokens.</h5>
        </Col>
          </Row>
          </div>
          <div>
            <Row>
              <Col sm="5">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Tokens bet on {this.props.match.params.name}</th>
                  <th>Up/Down</th>
                </tr>
              </thead>
              <tbody id='bodyBets'>

              </tbody>
            </Table>
            </Col>
            <Col sm="5">
            <TradingViewWidget symbol={this.props.match.params.name} theme={Themes.LIGHT} locale="en"/>
            </Col>
            </Row>
          </div>
          <h4> Stock News</h4>
          <div id="news"></div>{/* <Button outline color="primary" onClick={this.viewNews} block>Search</Button> */}
          </body>
        </div>

      )}
      </AuthUserContext.Consumer>
    );
  }

  handleUp(e){
    e.preventDefault();
    this.handleSubmit('Up');
    console.log('Up');
  }

  handleDown(e){
    e.preventDefault();
    this.handleSubmit('Down');
    console.log('Down');
  }

  handleFavorite(e){

    if(document.getElementById('fav').innerText === 'Favorite'){
      console.log('favoriting');
      var ticker = this.props.match.params.name;
      var userDoc = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).collection("favorites").doc(ticker)
      userDoc.set({
        Ticker: ticker,
        price: this.state.price
      })
      document.getElementById('fav').innerText = 'Un-favorite';


    }else{
      console.log('unfavoriting');
      var ticker = this.props.match.params.name;
      var userDoc = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).collection("favorites").doc(ticker).delete();
      document.getElementById('fav').innerText = 'Favorite';
    }

  }

  handleSubmit(dir) {

    //e.preventDefault();
    var stock = this.props.match.params.name;
    var tokens = document.getElementById('tokens').value;
    var date = new Date();
    date.setHours(0,0,0);
    //var betsToday;
    
    if(tokens !==  "" && this.state.balance-tokens  >= 0){
      var bets = this.state.nOfBets == null ? 0:this.state.nOfBets; 
      var betsToday = this.state.betsToday == null ? 0:this.state.betsToday; 
      if(new Date(this.state.lastBetDate.seconds*1000) < date){
        betsToday = 0;
      }

      this.props.firebase.db.collection("Stocks").doc(this.props.match.params.name).update({
        nOfBets: bets +1 ,
        betsToday: betsToday + 1,
        lastBetDate: date,
      });

      console.log(this.props.firebase.auth.O);
      var userDoc = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O);
      userDoc.set({
        balance: (this.state.balance-tokens)
      }, {merge: true});
      //TODO: bets collection
      this.props.firebase.db.collection("Bets").add({
        userDoc: userDoc,
        stockId: stock,
        direction: dir,
        timestamp: new Date(),
        username: this.state.username,
        bet: tokens
      });
    }
    /* 
    TODO retreive bets for current period
    */
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).get().then(data => {
        this.setState({data: data});
        console.log(data.data().balance);
        this.setState({
          balance: data.data().balance,
        })
      }
    )
    if(this.state.balance < 100){
      this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O)
      .collection("notifications")
      .where('type', '==', 'lowTokens')
            .where("active", '==', true).get().then(docSnapshot => {
                if(docSnapshot.size===0){
                this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).collection("notifications").add({
                  message: 'You have less than 100 tokens left, go to the account section to add tokens.',
                  active: true,
                  type: 'lowTokens',
                  time: new Date(),
                });
              }
              }, err => {
                console.log(`Encountered error: ${err}`);
              });

    }
  }



  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.balance === 0 ? "warning" : "primary";
    return classes;
  }

  formatNumberOfTokensLeft() {
    const { balance } = this.state;
    return balance === 0 ? "Zero" : balance;
  }

  viewNews() {
     document.getElementById('news').innerHTML ='';
     var stock = this.props.match.params.name;
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

}



const condition = authUser => !!authUser;

export default withAuthorization(condition)(Stocks);
