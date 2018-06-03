var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resep = new Schema({
  resepid : Number,
  namaresep : String,
  penulis : Number,
  bahan : [{listbahan: String}],
  langkah: [{detail: String}],
  langkahimages: [{images: String}],
  created : String,
  like: {type: Number, default: 0},
  likedby: [{userid: Number}],
  foto: String,
  indicator: [{status: String}]
})

module.exports = mongoose.model('Resep', resep)
