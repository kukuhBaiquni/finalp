var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comment = new Schema({
  resepid : Number,
  userid: Number,
  username : String,
  userfoto: String,
  content : String,
  created : String,
})

module.exports = mongoose.model('Comment', comment)
