var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

<<<<<<< HEAD
<<<<<<< HEAD
app.listen(3000, function() {
    console.log('App listening on port 3000')
=======
app.listen(4000, function() {
    console.log('App listening on port 3000')
=======
app.listen(4000, function() {
    console.log('App listening on port 3000')
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
})

/* Alpha Vantage Implementation */
const alpha = require('alphavantage')({ key: '2U48DC45SZ4PJT3U'});
alpha.data.intraday('msft', outputsize='compact', datatype='json', interval='5min').then(data => {
    msftTimeSeries = data['Time Series (5min)']
    var sum = 0.0;
    var count = 0.0;
    var dailyavg = 0.0;
    for (var d in Object.keys(msftTimeSeries)) {
        vals = Object.values(msftTimeSeries)[d];
        console.log(vals);
        var high = Number(vals['2. high']);
        var low = Number(vals['3. low']);
        var val = (high + low) / 2.0;
        sum += val
        console.log(sum)
        count++;
        console.log(count);
    }
    dailyavg = sum / count;
    console.log('Daily Average for MSFT: ' + dailyavg);
<<<<<<< HEAD
>>>>>>> tanuj
=======
>>>>>>> ed0cbf742fc25253e6523f276583eecb5308c445
})