var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comment = new Schema({
  resepid : Number,
  userid : Number,
  content : String,
  created : String,
})

module.exports = mongoose.model('Resep', resep)
