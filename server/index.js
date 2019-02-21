var express = require('express');
var app = express();

const HIGH_KEY = '2. high';
const LOW_KEY = '3. low';

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(4000, function() {
    console.log('App listening on port 3000')
})

/* Alpha Vantage Implementation */
const alpha = require('alphavantage')({ key: '2U48DC45SZ4PJT3U'});
alpha.data.intraday('msft', outputsize='compact', datatype='json', interval='5min')
// .then(data => JSON.parse())
.then(data => {
    msftTimeSeries = data['Time Series (5min)'];
    console.log(msftTimeSeries);
    var sum = 0.0;
    var count = 0.0;
    var dailyavg = 0.0;

    for(let key in msftTimeSeries) {
        sum += getAvgFromStrings(
            msftTimeSeries[key][HIGH_KEY], 
            msftTimeSeries[key][LOW_KEY]);
            
        count++;
    }

    dailyavg = sum / count;
    console.log(dailyavg);
})

function getAvgFromStrings(str1, str2) {
    return (Number(str1) + Number(str2)) / 2.0;
}