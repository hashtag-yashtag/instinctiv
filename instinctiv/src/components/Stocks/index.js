import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from '../Session';
import { Input, Table, Button, Col, Row, Card, Alert } from 'reactstrap';
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
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
    this.viewNews();
  }

  componentWillUnmount(){
    this.user();
    this.bets();
  }


  renderBets(bet, index) {
    //var db = this.props.firebase.db;
    var row = document.createElement('tr');
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

    document.getElementById("bodyBets").appendChild(row);
    
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <div className="column small-centered small-11 medium-6 large-5">
          <h1>{this.props.match.params.name}</h1>
          <Card body outline color="primary">
                  <Button color = "success" id="up" onClick={this.handleFavorite.bind(this)} type="submit">Favorite</Button>
                  <Alert color="primary">
                    <strong>name: {this.state.name}</strong>
                  </Alert>
                  <Alert color="info">
                    <strong>address: {this.state.address}</strong>
                  </Alert>
                  <Alert color="info">
                    <strong>ceo: {this.state.ceo}</strong>
                  </Alert>
                  <Alert color="info">
                    <strong>companyURL: {this.state.companyURL}</strong>
                  </Alert>
                  <Alert color="info">
                    <strong>description: {this.state.description}</strong>
                  </Alert>
                  <Alert color="info">
                    <strong>employees: {this.state.employees}</strong>
                  </Alert>
                  <Alert color="info">
                    <strong>stockExchange: {this.state.stockExchange}</strong>
                  </Alert>
                  <Alert color="warning">
                    <strong>price: {this.state.price}</strong>
                  </Alert>
                  <Alert color="success">
                    <strong>time_updated: {this.state.time_updated}</strong>
                  </Alert>
            </Card>

          <Row>
              <Col sm="6">
                <Input type="number" name="tokens" id="tokens" placeholder="Enter a amount to bet"/>
              </Col>
              <Col sm="2">
                <Button color = "success" id="up" onClick={this.handleUp.bind(this)} type="submit"> Up </Button>
              </Col>
              <Col sm="2">
                <Button color = "secondary" id="down" onClick={this.handleDown.bind(this)} type="submit"> Down </Button>
              </Col>
          </Row>

          <h3>You currently have</h3>
          <span className={this.getBadgeClasses()}>
            {this.formatNumberOfTokensLeft()}
          </span>
          <h6> number of tokens.</h6>
          <Table striped hover>
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Tokens Bet</th>
                  <th>Up/Down</th>
                </tr>
              </thead>
              <tbody id='bodyBets'>

              </tbody>
            </Table>
          </div>
          <div>
            <TradingViewWidget symbol={this.props.match.params.name} theme={Themes.LIGHT} locale="en"/>
          </div>
          <h4> Stock News</h4>
          <div id="news"></div>{/* <Button outline color="primary" onClick={this.viewNews} block>Search</Button> */}

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
    var ticker = this.props.match.params.name;
    var userDoc = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).collection("favorites").doc(ticker)
    userDoc.set({
      Ticker: ticker,
      price: this.state.price
    })
  }

  handleSubmit(dir) {

    //e.preventDefault();
    var stock = this.props.match.params.name;
    var tokens = document.getElementById('tokens').value;
    if(tokens !==  "" && this.state.balance-tokens  >= 0){
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
        username: this.state.username,
        bet: tokens
      });
    }
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
