var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

var Photo = mongoose.model('image'); //Makes an object from that schema as a model

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
