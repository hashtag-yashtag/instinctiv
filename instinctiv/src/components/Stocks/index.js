import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from '../Session';
import { Input, Button } from 'reactstrap';
import './stocks.css';


class Stocks extends Component {

  constructor(props){
    super(props);
    this.state = {
      authUser: null,
      balance: '',

    }
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmitStock = this.handleSubmitStock.bind(this);
  }

  componentDidMount() {
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: docSnapshot`, docSnapshot.data());
      this.setState({
        balance: docSnapshot.data().balance,
        username: docSnapshot.data().username
      });      // ...
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <div className="row">
              <div className="column small-centered small-11 medium-6 large-5">
          <h1>Stocks</h1>
          <Input>Search Stocks</Input>
          <form>
            <label>
              Tokens to Bet:
              <Input type="number" name="tokens" id="tokens" placeholder="Enter a amount to bet"/>
              <Button color = "success" id="up" onClick={this.handleUp.bind(this)} type="submit"> Up </Button>
              <Button color = "secondary" id="down" onClick={this.handleDown.bind(this)} type="submit"> Down </Button>
            </label>
          </form>

          <h3>You currently have</h3>
          <span className={this.getBadgeClasses()}>
            {this.formatnumberOfTokensLeft()}
          </span>
          <h9> number of tokens.</h9>
          <h9> </h9>
          <h4> Search Stock News</h4>

          <input type="text" id="compName" placeholder="Company Name"></input>

          <Button outline color="primary" onClick={this.viewNews} block>Search</Button>
          </div>
        </div>
        <br></br>
        <div id="news"></div>

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

  handleSubmit(dir) {

    //e.preventDefault();
    var stock = 'temp';//document.getElementById('stock').value;
    var tokens = document.getElementById('tokens').value;
    if(tokens !=  "" && this.state.balance-tokens  >= 0){
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
  }



  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.balance === 0 ? "warning" : "primary";
    return classes;
  }

  formatnumberOfTokensLeft() {
    const { balance } = this.state;
    return balance === 0 ? "Zero" : balance;
  }

  viewNews() {
     document.getElementById('news').innerHTML ='';
     var stock = document.getElementById("compName").value;
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
