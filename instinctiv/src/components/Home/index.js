import React from 'react';
import firebase from '../Firebase';
import { render } from 'react-dom'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

//Auth guard needed first
//var ticker = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.currentUser).collection("Investments").Ticker;
const Home = () => (
  <div>
    <h1>Home</h1> 
  </div>
);

export default Home;