import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { Alert, Table, Card, Col, Row, CardText, Button } from 'reactstrap';
//import {Button, Input, Label} from 'reactstrap';
import 'react-autocomplete-input/dist/bundle.css'

class Help extends Component{
  toggleDarkLight = event => {
   var body = document.getElementById("body");
   var currentClass = body.className;
   body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
 }

  render(){
    return (
      <div>
      <body id="body" class="light-mode">
      <Button color="primary" name="dark_light" onClick= {this.toggleDarkLight} title="Toggle dark/light mode">Change Theme</Button>
      <h1>Welcome to Instinctiv</h1>

  Instinctiv is a stock prediction for the people and by the people. New to Instinctiv? Do not worry, we have you covered.

  <h2> Frequently Asked Questions</h2>
  <strong>I forgot my password. What do I do?<br/></strong>
  Click on Reset Password in the Sign In page and enter your mail address. A link will be sent to you shortly regarding how to change your password. <br/>
  <br/>
  <strong> Do I need to buy stocks directly? </strong><br/>
  No, you do not need to. You can buy tokens which you can use to invest and bet on different stocks.
  <br/>
  <br/>
  <strong> How is the leaderboard calculated</strong><br/>
  Your predictions are verified with the actual stock movement to calculate your score. All your previous predictions are used and pile up to find your score.<br/>
  <br/>
  <strong> How often are the stock details updated? </strong> <br/>
  Stock values are updated in the order of seconds. It is completely real time.<br/>
  <br/>
  <strong>When are the leaderboard standings updated? </strong> <br/>
  The stock movement is taken everyday as soon as the stock market closes, so the leaderboard is updated at the end of each day.<br/>
  <br/>
  <strong> Can I view what other users are placing bets on? </strong><br/>
  Yes and no. if you are not connected to the user, then you cannot view his/her stocks. But stocks can be viewed and shared between users who are connected.<br/>
  <br/>
  <strong>Can I know how my stocks are performing regularly?</strong><br/>
  Yes, you can. A comprehensive summary of the performance of all of your stocks can be viewed at the end of each day through our notifications tab. Make sure to keep checking it.<br/>
  <br/>
  <strong> Is there an Instinctiv app for mobile devices?</strong><br/>
  As of right now, we do not have an app. But you can access our mobile friendly page on any other devices with ease.<br/>
  <br/>
  <h2> Contact Us </h2>
  Have questions that are not answered above. Let us know about your issues or feedback by contacting the following mail. We typically reply within one business day.<br/>
  Contact us:
  <a href="mailto:kondapal@purdue.edu" target="_top"> Instinctiv Help</a>
  </body>
  </div>
    );
  }
}

export default Help;
