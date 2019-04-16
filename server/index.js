var express = require('express');
var app = express();
const util = require('util')
const bodyParser = require('body-parser');
import schedule from 'node-schedule'
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
    var now = new Date();
    var nextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        7, 59, 59
    );
    msToNextDay = nextDay.getTime() - now.getTime();
    console.log(msToNextDay)

    bettingPool = {}
    marketSplit = {}
    weightedMarketSplit = {}

    getBetList()
    console.log(bettingPool)
    console.log(marketSplit)
    console.log(weightedMarketSplit)

    setTimeout(startNewGame(), msToNextDay);
}

var j = schedule.scheduleJob({hour: 07, minute: 59}, startNewGame())

const stockTickers = []
const stockNames = []

db.collection('Stocks').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        if (doc.data()['ticker']) {
            stockTickers.push(doc.data()['ticker'])
            stockNames.push(doc.data()['name'])
        }
    });
});

async function setUserAccuracy(uid) {

    return;
}

async function predictStock(stockTicker) {
    return;
}

async function getBetList() {
    const users = []
    const accuracy = []
    await db.collection('Bets').get().then(
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
                    });
                }
            )
        }
    )

    for (var user of users) {
        db.collection("Users").doc('' + user).onSnapshot(querySnapshot => {
            // if(querySnapshot.data()['accuracy']) {
            //     accuracy.push(querySnapshot.data()['accuracy'])
            // }
            // else {
            //     accuracy.push(0.5);
            // }
            // console.log(querySnapshot.data())
        })
    }

}
getBetList();

// const stockNames = []
// const stockTickers = []

// async function getCompanies() {
//     await db.collection('Stocks').get().then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             stockTickers.push(doc.data()['ticker'])
//             stockNames.push(doc.data()['name'])
//         });
//     });
// }

// async function getPrices() {
//     // populate stock names and tickers
//     await getCompanies();
//     let identifier;
//     for (let stock of stockTickers) {
//         await companyAPI.getCompany(stock).then(data => (
//             db.collection('Stocks').doc(stock).set({
//                 description: data['short_description'],
//                 stockExchange: data['stock_exchange'],
//                 companyURL: data['company_url'],
//                 ceo: data['ceo'],
//                 address: data['business_address'],
//                 employees: data['employees']
//             }, { merge: true })
//         ), 
//         (error) => console.error(error));          
//     }
// }

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

