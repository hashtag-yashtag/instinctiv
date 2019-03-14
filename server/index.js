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

