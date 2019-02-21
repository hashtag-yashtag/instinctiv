import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { Alert, Label, Input } from 'reactstrap';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { Table } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './home.css';
import { render } from 'react-dom'

function viewNews() {

  var url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&category=business'+

            '&apiKey=34c665fbab834d7c80356f0bf458b1a7';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
    for(var i=0; i < data.articles.length; i++){
     
      var title = data.articles[i].title;

      if(title == null){
        title ="";
      }
      var desc = data.articles[i].description;
      var auth = data.articles[i].author;
      var link = data.articles[i].url;
      var link1 = data.articles[i].urlToImage;
      var date = data.articles[i].publishedAt;



    document.getElementById('root').append('<div class="item"><h2>' + title + '</h2>' +
               //character of escape: "quotes" and '+'
      '<img src="' + link1 +'">' +
      '<p class="publishedAt">' + date + '</p>' +
      '<p>' + desc + '</p>' +
      '<p>' + auth + '</p>' +
               //character of escape: "quotes" and '+'
      '<a href="'+ link +'">Read more</a></div>'
      );
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

  componentDidMount() {
    this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O).get().then(data => {
        this.setState({data: data});
        console.log(data.data().balance);
        this.setState({
          balance: data.data().balance,
        })
      }
    )
  }
  handleSubmit = e => {
    e.preventDefault();
    var stock = document.getElementById('stock').value;
    var tokens = document.getElementById('tokens').value;
    if(this.state.balance-tokens  > 0){ 
      console.log(this.props.firebase.auth.O);
      var userDoc = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.O);
      userDoc.set({
        balance: (this.state.balance-tokens)
      });
      userDoc.collection("Bets").add({
        stockId: stock,
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
  

  render() {
    return (
      <AuthUserContext.Consumer>
      {authUser => (
      <div>
        <div className="home-page">
          <h1>Welcome to Instinctiv, {authUser.email}</h1>
          <p>The Home Page is accessible by every signed in user.</p>
          <input type="text" className="input" placeholder="Search..." />
            </div>
            <div className="float-center">
              <Alert color="primary">
                Token Balance: {this.state.balance}
              </Alert>
              <form onSubmit={this.handleSubmit}>
                <Label for="Stock">Stock</Label>
                <Input type="text" name="StockID" id="stock" placeholder="Enter a Stock ID" />
                <Input type="number" name="tokens" id="tokens" placeholder="Enter a amount to bet" />
                <Button>Submit</Button>
              </form>              
            </div>
            <div className="float-right">
      
                <h3>Favorites</h3>
      
              <Table stripped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple</td>
                    <td>171.89</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                    <td>78.89</td>
                  </tr>
                  <tr>
                    <td>Netflix</td>
                    <td>45.78</td>
                  </tr>
                  <tr>
                    <td>Netflix</td>
                    <td>45.78</td>
                  </tr>
                  <tr>
                    <td>Netflix</td>
                    <td>45.78</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="float-left">
              <h3>Leaderboard</h3>
              <Table stripped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple</td>
                    <td>171.89</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                    <td>78.89</td>
                  </tr>
                  <tr>
                    <td>Netflix</td>
                    <td>45.78</td>
                  </tr>
                  <tr>
                    <td>Netflix</td>
                    <td>45.78</td>
                  </tr>
                  <tr>
                    <td>Netflix</td>
                    <td>45.78</td>
                  </tr>
                </tbody>
              </Table>
            </div>
        </div>
      )}
      </AuthUserContext.Consumer>
    );
    
  }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
