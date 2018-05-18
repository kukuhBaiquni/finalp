var express = require('express');
const jwt = require('jsonwebtoken')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
  let data = {
    email: req.body.email,
    password: req.body.password
  }
  let token = jwt.sign(data, 'sshkeyhahahaha')
  console.log(token)
})

module.exports = router;
