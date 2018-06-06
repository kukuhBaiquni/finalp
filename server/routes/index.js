var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var Resep = require('../models/resep')
var jwtDecode = require('jwt-decode');
var path = require('path');

router.get('/api/finalp', function(req, res, next) {
  res.send('server\'s up')
});

router.post('/api/finalp/register', function(req, res){

  const newUser = new User({
    userid : req.body.userid,
    namadepan : req.body.namadepan,
    namabelakang : req.body.namabelakang,
    email : req.body.email,
    password : req.body.password,
    created : req.body.created,
    fotoprofil: 'initialfp'
  })

  let toToken = {
    userid: req.body.userid,
    namadepan: req.body.namadepan,
    namabelakang: req.body.namabelakang,
    email: req.body.email,
    created: req.body.created
  }
  let token = jwt.sign(toToken, 'gabonlatoz', {})

  newUser.save(function(err, user){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }else{
      res.json({
        status : 'Success',
        user : user,
        token: token
      })
    }
  })
})

router.get('/api/finalp/resep', function(req, res){
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
router.get('/api/finalp/resepdetail/:id', function(req, res){
  let resepid = req.params.id
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

router.post('/api/finalp/tambahresep', function(req, res){
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

router.put('/api/finalp/:id', function(req, res, next){
  let resepid = req.params.id
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

router.post('/api/finalp/uploadfp', function(req, res){
  let imageFile = req.files.file
  let destination = path.join(__dirname, '../public/images')
  let filename = `${Date.now()}img`
  var decode = jwtDecode(req.body.token)
  var luser = decode.userid

  imageFile.mv(`${destination}/${filename}.jpg`, function(err){
    if (err) {
      return res.status(500).send(err);
    }
    User.findOne({userid: luser}, function(err, user){
      if (err) {
        res.json({
          status: 'Failed',
          message: 'error when updated to database'
        })
      }else if(user){
        user.update({$set: {fotoprofil: `${filename}.jpg`}}).exec(function(err, gabon){
          user.save(function(err){
            if (err) {
              res.json({
                status: 'Tercyduk'
              })
            }else{
              res.json({
                status: 'Done!',
                data : user
              })
            }
          })
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

router.get('/api/finalp/myrecipe/:token', function(req, res){
  let token = req.params.token
  let decoded = jwtDecode(token);
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
})

router.post('/api/finalp/myrecipe/:resepid', function(req, res){
  let resepid = req.params.resepid

  Resep.deleteOne({resepid}, function(err, res){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }else{
      res.json({
        status: 'Success'
      })
    }
  })
})

router.get('/api/finalp/:token', function(req, res){
  let token = req.params.token;
  var decoded = jwtDecode(token);
  User.find({userid: decoded.userid}, function(err, user){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }
    if (!user) {
      res.json({
        status: 'User doesn\'t exist'
      })
    }
    if (user) {
      res.json({
        status: 'Success',
        user : user
      })
    }
  })
})

router.post('/api/finalp/login', function(req, res, next){
  let data = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne(data, function(err, user){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }

    if (!user) {
      res.json({
        status: 'User doesn\'t exist!'
      })
    }

    if (user) {
      let toToken = {
        userid:user.userid,
        namadepan:user.namadepan,
        namabelakang:user.namabelakang,
        email:user.email,
        created:user.created
      }
      let token = jwt.sign(toToken, 'gabonlatoz', {})
      res.json({
        status: 'Success',
        data: user,
        token: token
      })
    }
  })
})

module.exports = router;
