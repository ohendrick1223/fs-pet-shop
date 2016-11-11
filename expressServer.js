'use strict';
//this sets me up
var express = require('express');
var app = express();
var petsPath = require('./pets.json');

app.use(express.static('public'));

//this request gets me the entire pets object
app.get('/pets/', function(req, res) {
    Number.parseInt(req.params.index);
    // res.sendStatus(200);
    res.send(petsPath);
});

//this request returns a 404 if client enter invalid index, and the specificed pet if client enters a correct index.
app.get('/pets/:index', function(req, res) {
    var index = Number.parseInt(req.params.index);

    if (Number.isNaN(index) || index < 0 || index >= petsPath.length) {
        return res.sendStatus(404);
    }
    res.send(petsPath[index]);
});


//this listens on server 3000 for all these responses
app.listen('3000', function() {
    console.log('listening on port 3000');
});

//this tests the app with the test suite in terminal
module.exports = app;
