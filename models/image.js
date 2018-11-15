var mongoose = require('mongoose');

//TODO: This needs to be redone to accept a photo instead of text
var photoSchema = mongoose.Schema({ //Defines the Schema for this database
  img: {data: Buffer, contentType: String} 
});

mongoose.model('image', photoSchema);