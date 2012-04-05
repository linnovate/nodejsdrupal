// Launch express and server
var express = require('express');
var app = express.createServer();

//connect to DB
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/meetup');

// Define Model
var Schema = mongoose.Schema;

var IngridientSchema = new Schema({
name : String,
price : String
});

mongoose.model('Ingridient', IngridientSchema);
var Ingridient = mongoose.model('Ingridient');

function buy_ingridient(ing_name, ing_price){
  var ingridient = new Ingridient();

  ingridient.name = ing_name;
  ingridient.price = ing_price;

  ingridient.save(function(err, ingridient_Saved){
    if(err){
      throw err;
      console.log(err);
    }else{
      console.log('saved!');
    }
  });
}

app.get('/buy/:ingridient/:price', function(req, res){
  res.send('Buting:' + req.params.ingridient + ' for:' + req.params.price);
  buy_ingridient(req.params.ingridient,req.params.price);
});

app.get('/list', function(req, res) {
    Ingridient.find({}, function(err, links) {
      res.send(links.map(function(d) {
          console.log(d.toObject());
          return JSON.stringify(d.toObject());
          }));
      });
    });
//Launch Server
app.listen(3333);
