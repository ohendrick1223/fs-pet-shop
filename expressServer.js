'use strict';
//this server gets me the entire json object
var express = require('express');
var app = express();
var petsPath = require('./pets.json');

app.use(express.static('public'));


app.get('/pets', function(req, res) {
  res.status(200);
  res.send(petsPath);
});

// this server gets me the json object at index 0
app.get('/pets/0', function(req, res) {
  res.status(200);
  res.send(petsPath[0]);
});

//this server gets me the json object at index 1
app.get('/pets/1', function(req, res) {
  res.status(200);
  res.send(petsPath[1]);
});


// //this server returns an error if there is no such object in the JSON object
app.get('/pets/2', function(req, res) {
  res.status(404) ;
  res.send(petsPath[2]);
});

app.get('/pets/-1', function(req, res) {
  res.status(404) ;
  res.send(petsPath[-1]);
});

//this listens on server 3000 for all these responses
app.listen( '8000', function() {
  console.log('listening on port 8000');
});

// for (var i = 0; i < petsPath.length; i++;) {
//   if//(an index is called that is  > petsPath.length || an index is called that is < 0)
//   {
//     // error checking return a 404
//   }
//   else {
//   app.get('/pets', function(req, res) {
//     res.status(200);
//     res.send(petsPath);
//   });
// }
// } need to add enother error check for if an index is not put in, then return the entire json object. Also need to figure out how to reference index positions.
