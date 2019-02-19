import React from 'react';
<<<<<<< HEAD
=======
import firebase from '../Firebase';
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
import { render } from 'react-dom'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

<<<<<<< HEAD
const Home = () => (
  <div>
    Home

=======
//Auth guard needed first
//var ticker = this.props.firebase.db.collection("Users").doc(this.props.firebase.auth.currentUser).collection("Investments").Ticker;
const Home = () => (
  <div>
    <h1>Home</h1> 
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
  </div>
);

export default Home;