var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  userid : Number,
  namadepan : String,
  namabelakang : String,
  email : String,
  password : String,
  created : String,
  fotoprofil : String,
  liking: [Number]
})

module.exports = mongoose.model('User', user)
