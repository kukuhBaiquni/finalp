'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const should = chai.should();
chai.use(chaiHTTP);

describe('users', function(){
  User.collection.drop()

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    done()
  })

  it('Add user should have response status 200 & type JSON', function(done){
    chai.request(server)
    .post('/api/finalp/users/register')
    .send({userid : 1528045517419})
    .send({namadepan : 'usertest123'})
    .send({namabelakang : 'usertest123'})
    .send({email : 'user@123.test'})
    .send({password : 'secretpassword'})
    .send({created : '22-05-2018'})
    .end(function(err, res){
      let token = jwt.sign({data: res.body.user}, 'gabonlatoz', {})
      localStorage.setItem('token', token)
      res.should.have.status(200);
      res.should.be.json;
      res.body.status.should.equal('Success');
      res.body.user.should.be.a('object');
      done();
    })
  })

  it('Load all users should have response status 200 & type array', function(done){
    chai.request(server)
    .get('/api/finalp/users/alluser')
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.user.should.be.a('array')
      done()
    })
  })

  //PENDING TEST
  // it('uploading profile user profile picture', function(done){
  //   chai.request(server)
  //   .post('/api/finalp/users/uploadfp')
  //   .send({file: 'files'})
  //   .end(function(err, res){
  //     res.should.have.status(200)
  //     res.should.be.json;
  //     res.body.status.should.equal('Success')
  //   })
  // })

  it('Load specific user should have status 200 & type array', function(done){
    chai.request(server)
    let token = localStorage.getItem('token')
    console.log(token)
    .get(`/api/finalp/users/${token}`)
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.user.should.be.a('array')
      done()
    })
  })

  it('Login should have response status 200', function(done){
    chai.request(server)
    .post('/api/finalp/users/login')
    .send({email: 'user@123.test'})
    .send({password: 'secretpassword'})
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.user.should.be.a('array')
      res.body.should.have.property('token')
      done()
    })
  })

})
