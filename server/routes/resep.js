var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var Resep = require('../models/resep')
var jwtDecode = require('jwt-decode');
var path = require('path');


// '/api/finalp/resep/'
router.get('/allresep', function(req, res){
  Resep.find(function(err, resep){
    if (err) {
      res.json({
        status: 'Failed',
        message: 'request timed out'
      })
    }else{
      res.json({
        status: 'Success',
        resep: resep
      })
    }
  })
})

//getResepdetail
router.get('/resepdetail/:resepid', function(req, res){
  let resepid = req.params.resepid
  Resep.find({resepid}, function(err, resep){
    if (err) {
      res.json({
        status: 'Failed',
        message: 'request timed out'
      })
    }else{
      res.json({
        status: 'Success',
        resep: resep
      })
    }
  })
})

router.post('/tambahresep', function(req, res){
  var resource = req.body.penulis
  var decode = jwtDecode(resource)
  var penulis = decode.userid
  var namapenulis = decode.namadepan.concat(' ' + decode.namabelakang)
  var imageFile = req.files
  let destination = path.join(__dirname, '../public/images')
  let filename = `${Date.now()}img`
  if (!decode || decode === undefined || decode === '' || penulis === undefined) {
    res.json({
      status: 'Failed'
    })
  }
  const newResep = new Resep({
    resepid: req.body.resepid,
    namaresep: req.body.nama,
    namapenulis: namapenulis,
    penulis: penulis,
    bahan: [],
    langkah: [],
    created: req.body.created,
    like: 0,
    comment: 0,
    likedby: [],
    foto: '',
    kategori: req.body.kategori
  })
  newResep.save(function(err, resep){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }else{
      if (typeof req.body.bahan === 'string') {
        resep.bahan.push({listbahan: req.body.bahan})
      }else{
        req.body.bahan.map(x=> resep.bahan.push({listbahan: x}))
      }
      if (typeof req.body.langkah === 'string') {
        resep.langkah.push({detail: req.body.langkah, images: ''})
      }else{
        req.body.langkah.map(x=> resep.langkah.push({detail: x, images: ''}))
      }
      imageFile.foto.mv(`${destination}/${filename}.jpg`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        resep.update({$set: {foto: `${filename}.jpg`}}).exec(function(err, gabon){
          resep.save(function(err){
            if (err) {
              res.json({
                status: 'Tercyduk'
              })
            }else{
              res.json({
                status: 'Done!',
                data : resep
              })
            }
          })
        })
      })
    }
  })
})

router.put('/fotolangkah/:resepid', function(req, res, next){
  let resepid = req.params.resepid
  let imageFile = req.files.file
  let destination = path.join(__dirname, '../public/images')
  let filename = `${Date.now()}img`

  imageFile.mv(`${destination}/${filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    Resep.findOne({resepid}, function(err, resep){
      if (err) {
        res.json({
          status: 'Failed',
          message: 'error when updated to database'
        })
      }else if(resep){
        resep.langkah[req.body.index-1].images = filename
        resep.save(function(){
          res.json({file: `images/${filename}.jpg`});
        })
      }else{
        res.json({
          status: 'Failed',
          message: 'cannot found the specified data'
        })
      }
    })
  })
})



router.get('/myrecipe/:token', function(req, res){
  let token = req.params.token
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        status: 'Someone trying to hack our system'
      })
    }else{
      let penulis = decoded.userid
      Resep.find({penulis}, function(err, recipes){
        if (err) {
          res.json({
            status: 'Failed'
          })
        }else if (!recipes) {
          res.json({
            status: 'User belum pernah menulis resep'
          })
        }else{
          res.json({
            status: 'Success',
            data: recipes
          })
        }
      })
    }
  })
})
// DELETING
router.post('/myrecipe/:resepid', function(req, res){
  let resepid = req.params.resepid

  Resep.deleteOne({resepid}, function(err){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }
  })
})

module.exports = router;
