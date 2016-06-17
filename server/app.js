var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');

var rngModule = require('../modules/rngModule');

var connectionString = 'postgres://localhost:5432/zoo';

app.use(express.static('public'));

app.listen(3000, 'localhost', function(req, res){
  console.log('listening on 3000');
});

app.get('/', function(req, res){
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/postAnimals', urlencodedParser, function(req, res){
  console.log('in /postAnimals: ' + req.body.animal + rngModule(1, 10));
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO zoo_animals (animal, animal_quantity) values($1, $2)', [req.body.animal, rngModule(1, 100)]);
  });
});

app.get('/displayAnimals', function(req, res){
  var animals = [];
  pg.connect(connectionString, function(err, client, done){
    var animalsQuery = client.query('SELECT * FROM zoo_animals;');
    animalsQuery.on('row', function(row){
      animals.push(row);
    });
    animalsQuery.on('end', function(){
      done();
      return res.json(animals);
    });
  });
});
