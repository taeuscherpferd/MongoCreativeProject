var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

//TODO: This needs to be redone to accept a photo instead of text
var photoSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
});

var Photo = mongoose.model('Photo', photoSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors

db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//TODO: This is where we will be recieving the File, so all the save logic should go here (in theory... ;)
router.post('/upload', function(req, res, next) {
  console.log("made it to upload");
  console.log(req.body);
  res.sendStatus(200);
  // var newPhoto = new Photo(req.body);
  // newPhoto.save(function(err, result) {
  //   if (err) { console.log("Got Error"); }
  //   else {
  //     console.log(result);
  //     res.sendStatus(200);
  //   }
  // });
});

module.exports = router;
