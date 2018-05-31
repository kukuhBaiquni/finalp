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
    created : req.body.created
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

router.post('/api/finalp/tambahresep', function(req, res){
  var resource = req.body.penulis
  var decode = jwtDecode(resource)
  var penulis = decode.userid
  if (!decode || decode === undefined || decode === '') {
    res.json({
      status: 'Failed'
    })
  }

  const newResep = new Resep({
    penulis: penulis,
    resepid: req.body.resepid,
    namaresep: req.body.namaresep,
    bahan: req.body.bahan,
    detail: req.body.detail,
    created: req.body.created,
    foto: [],
    like: 0
  })

  newResep.save(function(err, resep){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }else{
      res.json({
        status: 'Success',
        data: resep
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
          message: 'error when updated to databse'
        })
      }else if(resep){
        resep.images.push({listfoto: filename})
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

router.post('/api/finalp/checktoken', function(req, res){

})

router.get('/api/finalp/:token', function(req, res){
  let token = req.params.token;
  var decoded = jwtDecode(token);
  User.findOne({userid: decoded.userid}, function(err, user){
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
