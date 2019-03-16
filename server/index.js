var express = require('express');
var app = express();
const util = require('util')
const bodyParser = require('body-parser');
var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = "OjcyZjYxNWY0YWYyNDJjZWU2OWJiNmI3MDMyMWIwNThk";
var companyAPI = new intrinioSDK.CompanyApi();
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBvSjVcV8LNU63a5BKYuSRNh68G67Upbsk",
    authDomain: "project-instinctiv.firebaseapp.com",
    databaseURL: "https://project-instinctiv.firebaseio.com",
    storageBucket: "project-instinctiv.appspot.com",
    projectId: "project-instinctiv",
    messagingSenderId: "438722528457"
  };
firebase.initializeApp(config);

var db = firebase.firestore();

const HIGH_KEY = '2. high';
const LOW_KEY = '3. low';

var stockNames = []
var stockTickers = []

companyAPI.getAllCompanies({'pageSize': 200}).then(function (data) {
    console.log('API called successfully. Returned data: ');
    console.log(util.inspect(data, false, null, true));
    var companyData = data;
    //console.log(typeof(companyData))
    for (var d of companyData['companies']) {
        stockNames.push(d['name']);
        stockTickers.push(d['ticker']);
        db.collection('Stocks').doc(d['ticker']).set({
            ticker: d['ticker'],
            name: d['name']
        }).then(
            console.log("written")
        ).catch(
            function(error) {
                console.log("ERROR "+ error);
            }
        )
    }
}, function (error) {
    console.error(error);
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express!' });
})

app.listen(4000, function () {
    console.log('App listening on port 3000')
})

