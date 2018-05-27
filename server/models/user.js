var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  userid : Number,
  namadepan : String,
  namabelakang : String,
  email : String,
  password : String,
  created : String,
  foto : String
})

module.exports = mongoose.model('User', user)
