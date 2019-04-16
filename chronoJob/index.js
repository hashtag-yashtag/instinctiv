var intrinioSDK = require('intrinio-sdk');
var firebase = require('firebase');
const util = require('util')

const CALLS_PER_MIN = 20;
const CALL_INTERVAL = 1000*60; /* one minute */

const stockTickers = []
const stockNames = []
var config = {
    apiKey: "AIzaSyBvSjVcV8LNU63a5BKYuSRNh68G67Upbsk",
    authDomain: "project-instinctiv.firebaseapp.com",
    databaseURL: "https://project-instinctiv.firebaseio.com",
    storageBucket: "project-instinctiv.appspot.com",
    projectId: "project-instinctiv",
    messagingSenderId: "438722528457"
  };
firebase.initializeApp(config);
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey = "OjcyZjYxNWY0YWYyNDJjZWU2OWJiNmI3MDMyMWIwNThk";
var securityAPI = new intrinioSDK.SecurityApi();
var db = firebase.firestore();
var opts = { 'source': 'bats_delayed' };


//To read from DB
async function getIndex() {
    let index;
    await db.collection('Variable').doc('INDEX_STOCK_ARRAY').get().then(data => {
        index = (data.data()['index']);
    })
    return index;
}

//To write into DB

async function writeIndex(newIndex) {
    await db.collection('Variable').doc('INDEX_STOCK_ARRAY').update({
        index: newIndex
    })
}

async function getCompanies() {

    await db.collection('Stocks').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            stockTickers.push(doc.data()['ticker'])
            stockNames.push(doc.data()['name'])
            console.log(doc.data()['ticker']);
        });
    });
}



function subarray(arr, beg, end) {
    end = (end > arr.length) ? arr.length : end;
    return arr.slice(beg, end);
}

async function makeCalls(stocks) {
    for(let stock of stocks) {
        console.log(stock)
        const time = new Date();
        await securityAPI.getSecurityRealtimePrice(stock, opts).then(data => {
            console.log(data['last_price'])
            const currPrice = 0.0
            const count = 0
            db.collection('Stocks').doc(stock).get().then(data => {
                currPrice = data.data()['price'];
                count = data.data()['count'];
            })
            db.collection('Stocks').doc(stock).update({
                price: data['last_price'],
                priceSum: currPrice + data['last_price'],
                time_updated: time.getTime(),
                count: count
            })
        },
        (error) => { throw new Error(error) })
    }
}

async function throttleCalls(tc_idx) {
    try {
        await makeCalls(subarray(stockTickers, tc_idx, tc_idx + CALLS_PER_MIN));
        tc_idx = (tc_idx + CALLS_PER_MIN);
        tc_idx = (tc_idx > stockTickers.length) ? 0 : tc_idx;
        return tc_idx;
    } catch(e) {
        console.log(e);
    }
}

async function runScript() {
    console.log("running script");
    await getCompanies();

    const index = await getIndex();
    const newIndex = await throttleCalls(index);

    await writeIndex(newIndex)
}

runScript();
setInterval(() => {
    runScript();
}, CALL_INTERVAL);
