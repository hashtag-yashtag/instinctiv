import React from 'react';

import { withAuthorization } from '../Session';
<<<<<<< HEAD
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { Table } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './home.css';
=======
import { render } from 'react-dom'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
>>>>>>> db44897d6774e5080d10531d35885ca0679076da

function viewNews() {

  var url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&category=business'+
<<<<<<< HEAD

            '&apiKey=34c665fbab834d7c80356f0bf458b1a7';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

    for(var i=0; i < data.articles.length; i++){

=======
            
            '&apiKey=34c665fbab834d7c80356f0bf458b1a7';
  
  fetch(url) 
    .then(response => response.json())
    .then(data => {
      console.log(data);
  
    for(var i=0; i < data.articles.length; i++){
     
>>>>>>> db44897d6774e5080d10531d35885ca0679076da
      var title = data.articles[i].title;

      if(title == null){
        title ="";
      }
      var desc = data.articles[i].description;
      var auth = data.articles[i].author;
      var link = data.articles[i].url;
      var link1 = data.articles[i].urlToImage;
      var date = data.articles[i].publishedAt;
<<<<<<< HEAD



    document.getElementById('root').append('<div class="item"><h2>' + title + '</h2>' +
               //character of escape: "quotes" and '+'
      '<img src="' + link1 +'">' +
=======
      
    

    document.getElementById('root').append('<div class="item"><h2>' + title + '</h2>' +
               //character of escape: "quotes" and '+'
      '<img src="' + link1 +'">' + 
>>>>>>> db44897d6774e5080d10531d35885ca0679076da
      '<p class="publishedAt">' + date + '</p>' +
      '<p>' + desc + '</p>' +
      '<p>' + auth + '</p>' +
               //character of escape: "quotes" and '+'
      '<a href="'+ link +'">Read more</a></div>'
      );
      }
  });
      }
<<<<<<< HEAD



const HomePage = () => (
  <div>
  <div className="home-page">
    <h1 onload="viewNews()">Welcome to Instinctiv</h1>
    <p>The Home Page is accessible by every signed in user.</p>
     <input type="text" className="input" placeholder="Search..." />
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
=======
  
  

const HomePage = () => (
  <div>
    <h1 onload="viewNews()">Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p> 
    
>>>>>>> db44897d6774e5080d10531d35885ca0679076da
  </div>
);

const condition = authUser => !!authUser;

<<<<<<< HEAD
export default withAuthorization(condition)(HomePage);
=======
export default withAuthorization(condition)(HomePage);
>>>>>>> db44897d6774e5080d10531d35885ca0679076da
