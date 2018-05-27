var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resep = new Schema({
  resepid : Number,
  namaresep : String,
  bahan : String,
  detail: String,
  penulis : Number,
  created : String,
  like: Number,
  foto : String
})

module.exports = mongoose.model('Resep', resep)
