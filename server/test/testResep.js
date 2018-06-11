'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Resep = require('../models/resep');
const jwt = require('jsonwebtoken')

const should = chai.should();
chai.use(chaiHTTP);

describe('reseps', function(){
  Resep.collection.drop()

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    done()
  })

  it('Add resep should have response status 200 & type array', function(done){
    chai.request(server)
    .post('/api/finalp/resep/tambahresep')
    .send({data: 'data123'})
    .end((err, res)=>{
      res.should.have.status(200)
      res.should.be.json;
      res.body.status.should.equal('Success')
      done()
    })
  })
})
