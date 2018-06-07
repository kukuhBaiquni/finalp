var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resep = new Schema({
  resepid : Number,
  namaresep : String,
  penulis : Number,
  namapenulis: String,
  bahan : [{listbahan: String}],
  langkah: [{detail: String, images: String}],
  created : String,
  like: {type: Number, default: 0},
  likedby: [Number],
  foto: String,
  comment: {type: Number, default: 0},
  kategori: String,
})

module.exports = mongoose.model('Resep', resep)
