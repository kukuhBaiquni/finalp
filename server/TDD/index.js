'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require('../models/user')
const Resep = require('../models/resep')
const Comment = require('../models/comment')

const should = chai.should();
chai.use(chaiHTTP)

describe()
