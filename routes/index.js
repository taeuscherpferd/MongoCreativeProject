var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

var Image = mongoose.model('image'); //Makes an object from that schema as a model
var CounterSchema = mongoose.Schema({ //Defines the Schema for this database
  yes: Number,
  no: Number
});

var Counter = mongoose.model('Counter', CounterSchema); //Makes an object from that schema as a model

router.put('/counter', function(req, res, next) {
  //Adds counter if none in database
  Counter.countDocuments({}, function(err, count) {
    if (err) { console.log(err); }
    if (count == 0) {
      var originalCounter = new Counter({yes:0,no:0});
      originalCounter.save(function(err) {
        if (err) console.log(err);
        console.log("added counter");
      });
       console.log('there are %d jungle adventures', count);
    } else {
      //Should update the single counter doc (add a yes value?)
      res.send(200);
    }
  });
});

router.get('/counter', function(req,res,next) {
    Counter.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

router.get('/images', function(req, res, next) {
  Image.find(function(err, images) {
    if (err) { return next(err); }
    res.json(images);
  });
});

router.getImages = function(callback, limit) {
  console.log("Did I make it?");
  Image.find(callback).limit(limit);
};

router.getImageById = function(id, callback) {
  Image.findById(id, callback);
};

router.addImage = function(image, callback) {
  Image.create(image, callback);
};

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

router.delete('/deletealldonttouch', function(req, res, next) {
  console.log("in Delete");
  Image.remove({}, function(err) {
    if (err) { return next(err); }
    console.log('collection removed');
  });
  res.sendStatus(200);
});

var upload = multer({
  storage: storage
});

router.post('/upload', upload.any(), function(req, res, next) {

  res.send(req.files);

  /*req.files has the information regarding the file you are uploading...
  from the total information, i am just using the path and the imageName to store in the mongo collection(table)
  */
  var path = req.files[0].path;
  var imageName = req.files[0].originalname;

  var imagepath = {};
  imagepath['path'] = path;
  imagepath['originalname'] = imageName;

  //imagepath contains two objects, path and the imageName

  //we are passing two objects in the addImage method.. which is defined above..
  router.addImage(imagepath, function(err) {
    if (err) { console.log("Ah darn broken again") }
    console.log("ImageSaved");
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
