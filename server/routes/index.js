var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var Comment = require('../models/comment')
var Resep = require('../models/resep')
var jwtDecode = require('jwt-decode');
var path = require('path');

router.get('/', function(req, res, next) {
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
    fotoprofil: 'initialfp.jpg'
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

router.post('/api/finalp/myrecipe/:resepid', function(req, res){
  let resepid = req.params.resepid

  Resep.deleteOne({resepid}, function(err){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }
  })
})

router.get('/api/finalp/alluser', function(req, res){
  User.find({}, function(err, users){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }else{
      res.json({
        status: 'Success',
        user: users
      })
    }
  })
})

router.get('/api/finalp/:token', function(req, res){
  let token = req.params.token;
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        status: 'Someone trying to hack our system'
      })
    }else{
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
    }
  })
})

router.post('/api/finalp/login', function(req, res, next){
  let data = {
    email: req.body.email,
    password: req.body.password
  }

  User.find(data, function(err, user){
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
        userid:user[0].userid,
        namadepan:user[0].namadepan,
        namabelakang:user[0].namabelakang,
        email:user[0].email,
        created:user[0].created
      }
      let token = jwt.sign(toToken, 'gabonlatoz', {})
      res.json({
        status: 'Success',
        user: user,
        token: token
      })
    }
  })
})

router.get('/api/finalp/liked/:token', function(req, res){
  let token = req.params.token;
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        alert: 'Someone trying to hack our system'
      })
    }else{
      var target = []
      var userid = decoded.userid
      User.findOne({userid}, function(err, user){
        Resep.find({}, function(err, resep){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else{
            for (var i = 0; i < user.liking.length; i++) {
              resep.map(function(x){
                if (x.resepid === user.liking[i]) {
                  target.push(x)
                }
                return x
              })
            }
            res.json({
              status: 'Cool',
              liked: target
            })
          }
        })
      })
    }
  })

})

router.get('/api/finalp/loadcomment/:id', function(req, res){
  let resepid = req.params.id
  Comment.find({resepid}, function(err, comment){
    if (err) {
      res.json({
        status: 'Tercyduk'
      })
    }else if(comment){
      res.json({
        status: 'Data found',
        comment: comment
      })
    }else{
      res.json({
        status: 'Resep is missing'
      })
    }
  })
})

router.post('/api/finalp/submitcomment', function(req, res){
  let resepid = req.body.resepid

  const newComment = new Comment({
    resepid: req.body.resepid,
    userid : req.body.userid,
    username: req.body.username,
    userfoto: req.body.userfoto,
    content: req.body.content,
    created : req.body.created
  })

  newComment.save(function(err, comment){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }else{
      Resep.find({resepid}, function(err, resep){
        if (err) {
          res.json({status: 'Tercyduk'})
        }else if(resep){
          resep[0].comment = resep[0].comment + 1
          resep[0].save(function(){
            res.json({
              status : 'Success',
              comment : comment
            })
          })
        }
      })
    }
  })
})

router.post('/api/finalp/liking', function(req, res){
  let userid = req.body.userid
  let resepid = req.body.resepid

  Resep.findOne({resepid}, function(err, resep){
    if (err) {
      res.json({
        status: 'Tercyduk'
      })
    }else if(resep){
      resep.like = resep.like + 1
      resep.likedby.push(userid)
      resep.save(function(){
        User.findOne({userid}, function(err, user){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else if(user){
            user.liking.push(resepid)
            user.save(function(){
              res.json({
                status: 'Liking Success'
              })
            })
          }else{
            res.json({
              status: 'Tercyduk2'
            })
          }
        })
      })
    }else{
      res.json({
        status: 'Data Tercyduk'
      })
    }
  })
})

router.post('/api/finalp/unliking', function(req, res){
  let userid = req.body.userid
  let resepid = req.body.resepid

  Resep.update({resepid}, {$pullAll: {likedby: [userid]}}).exec(function(err, gabon){
    Resep.findOne({resepid}, function(err, resep){
      if (err) {
        res.json({
          status: 'Tercyduk'
        })
      }else if(resep){
        resep.like = resep.like -1
        resep.save(function(){
          User.update({userid}, {$pullAll: {liking: [resepid]}}).exec(function(err, master){
            res.json({
              status: 'Unliking Success'
            })
          })
        })
      }else{
        res.json({
          status: 'Resep tidak ditemukan'
        })
      }
    })
  })
})

module.exports = router;
