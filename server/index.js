var express = require('express');
var app = express();
const util = require('util')
const bodyParser = require('body-parser');
var schedule = require('node-schedule');
// var intrinioSDK = require('intrinio-sdk');
// intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = "OjcyZjYxNWY0YWYyNDJjZWU2OWJiNmI3MDMyMWIwNThk";
// var companyAPI = new intrinioSDK.CompanyApi();
var firebase = require('firebase');
// const stripe = require("stripe")("sk_test_O5wvtpdkhKiwidIk8Q48kUhC");

// app.use(require("body-parser").text());

// app.post("/charge", async (req, res) => {
//     try {
//       let {status} = await stripe.charges.create({
//         amount: 2000,
//         currency: "usd",
//         description: "An example charge",
//         source: req.body
//       });

//       res.json({status});
//     } catch (err) {
//       res.status(500).end();
//     }
//   });


// ********* script for time checking 7:59am *******
// var now = new Date();
// var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 59, 0, 0) - now;
// if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 7:59am, try 7:59am tomorrow.
// }
// setTimeout(function(){alert("It's 7:59am!")}, millisTill10);

// ********* script for time checking 6:00pm *******
// var now = new Date();
// var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0) - now;
// if (millisTill10 < 0) {
//      millisTill10 += 86400000; // it's after 6:00pm, try 6:00pm tomorrow.
// }
// setTimeout(function(){alert("It's 6:00pm!")}, millisTill10);


async function userAccuracyUpdate() {
    getCompanies();
    getPrices();
    db.collection('Bets').get().then(
        function (querySnapshot) {
            querySnapshot.forEach(
                function (doc) {
                    doc.data().userDoc.onSnapshot(docSnapshot => {

                        /* Betting Pool Split
                                bettingPool - By Money
                                marketSplit - By Users
                                weightedMarketSplit - By users * accuracy
                        */
                        doc.data()['stockId']
                        
                    });
                }
            )
        }
    )
}

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
var bettingPool = {}
var marketSplit = {}
var weightedMarketSplit = {}
var msToNextDay = 0;

async function startNewGame() {
    await getBetList();
    var now = new Date();
    var nextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        7, 59, 59
    );
    msToNextDay = nextDay.getTime() - now.getTime();
    // console.log(msToNextDay)
    // bettingPool = {}
    // marketSplit = {}
    // weightedMarketSplit = {}
    // setTimeout(startNewGame(), msToNextDay);
}
startNewGame();

// var j = schedule.scheduleJob({hour: 07, minute: 59}, startNewGame())

const stockTickers = []
const stockNames = []
const stockPrices = []

// db.collection('Stocks').get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//         if (doc.data()['ticker']) {
//             stockTickers.push(doc.data()['ticker'])
//             stockNames.push(doc.data()['name'])
//             stockPrices.push
//         }
//     });
// });

async function setUserAccuracy(uid) {
    getStocks();
    db.collection('Bets').get().then(
        function (querySnapshot) {
            querySnapshot.forEach(
                function (doc) {
                    doc.data().userDoc.onSnapshot(docSnapshot => {
                        doc.data()['stockId'];
                    });
                }
            )
        }
    )
    return;
}

async function predictStock(stockTicker) {
    return;
}

async function getBetList() {
    console.log("inside getBetList")
    const users = []
    const accuracy = []
    db.collection('Bets').get().then(
        function (querySnapshot) {
            querySnapshot.forEach(
                function (doc) {
                    doc.data().userDoc.onSnapshot(docSnapshot => {

                        /* Betting Pool Split
                                bettingPool - By Money
                                marketSplit - By Users
                                weightedMarketSplit - By users * accuracy
                        */
                        if (!bettingPool[doc.data()['stockId']]) {
                            bettingPool[doc.data()['stockId']] = {}
                            marketSplit[doc.data()['stockId']] = {}
                            weightedMarketSplit[doc.data()['stockId']] = {}
                        }
                        if (doc.data()['direction'] == 'Up') {
                            if (!bettingPool[doc.data()['stockId']].Up) {
                                bettingPool[doc.data()['stockId']].Up = 0.0
                                marketSplit[doc.data()['stockId']].Up = 0
                                weightedMarketSplit[doc.data()['stockId']].Up = 0.0
                            }
                            marketSplit[doc.data()['stockId']].Up += 1
                            bettingPool[doc.data()['stockId']].Up += Number(doc.data()['bet'])
                            weightedMarketSplit[doc.data()['stockId']].Up += (docSnapshot.data()['accuracy'])
                        }
                        else if (doc.data()['direction'] == 'Down') {
                            if (!bettingPool[doc.data()['stockId']].Down) {
                                bettingPool[doc.data()['stockId']].Down = 0.0
                                marketSplit[doc.data()['stockId']].Down = 0
                                weightedMarketSplit[doc.data()['stockId']].Down = 0.0
                            }
                            marketSplit[doc.data()['stockId']].Down += 1
                            bettingPool[doc.data()['stockId']].Down += Number(doc.data()['bet'])
                            weightedMarketSplit[doc.data()['stockId']].Down += (docSnapshot.data()['accuracy'])
                        }
                    })
                }
            )
        }
    )

    // for (var user of users) {
    //     db.collection("Users").doc('' + user).onSnapshot(querySnapshot => {
    //         // if(querySnapshot.data()['accuracy']) {
    //         //     accuracy.push(querySnapshot.data()['accuracy'])
    //         // }
    //         // else {
    //         //     accuracy.push(0.5);
    //         // }
    //         // console.log(querySnapshot.data())
    //     })
    // }
}

async function getStocks() {
    await db.collection('Stocks').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            stockTickers.push(doc.data()['ticker'])
            stockNames.push(doc.data()['name'])
            stockPrices.push(doc.data()['price'])
        });
    });
}

async function generateResults() {
    let result = {}
    await db.collection('Stocks').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            ticker = doc.data()['ticker'];
            newPrice = doc.data()['price'];
            priceSum = doc.data()['priceSum'];
            intervals = doc.data()['count'];
            avgPrice = Number(priceSum) / Number(intervals);
        }).then(() => {
            db.collection('Results').doc(ticker).set({
                ticker: ticker,
                result: "UP"
            })
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

// getPrices();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// app.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello from Express!' });
// })

app.listen(4000, function () {
    console.log('App listening on port 4000')
})




