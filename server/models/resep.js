var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resep = new Schema({
  resepid : Number,
  namaresep : String,
  bahan : [{listbahan: String}],
  detail: String,
  penulis : Number,
  created : String,
  like: Number,
  likedby: [{userid: Number}],
  thumbnail: String,
  images : [{listfoto: String}]
})

module.exports = mongoose.model('Resep', resep)
