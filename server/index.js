var express = require('express');
var app = express();
const util = require('util')
const bodyParser = require('body-parser');
var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = "OjcyZjYxNWY0YWYyNDJjZWU2OWJiNmI3MDMyMWIwNThk";
var companyAPI = new intrinioSDK.CompanyApi();
var firebase = require('firebase');
const stripe = require("stripe")("sk_test_O5wvtpdkhKiwidIk8Q48kUhC");

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
  
      res.json({status});
    } catch (err) {
      res.status(500).end();
    }
  });
  


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

const stockNames = []
const stockTickers = []

async function getCompanies() {
    await db.collection('Stocks').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            stockTickers.push(doc.data()['ticker'])
            stockNames.push(doc.data()['name'])
        });
    });
}

async function getPrices() {
    // populate stock names and tickers
    await getCompanies();
    let identifier;
    for (let stock of stockTickers) {
        await companyAPI.getCompany(stock).then(data => (
            db.collection('Stocks').doc(stock).set({
                description: data['short_description'],
                stockExchange: data['stock_exchange'],
                companyURL: data['company_url'],
                ceo: data['ceo'],
                address: data['business_address'],
                employees: data['employees']
            }, { merge: true })
        ), 
        (error) => console.error(error));          
    }
}

getPrices();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from Express!' });
})

app.listen(4000, function () {
    console.log('App listening on port 4000')
})

