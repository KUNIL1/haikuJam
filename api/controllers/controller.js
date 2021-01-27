'use strict';
const haikuModule = require('./haiku')

module.exports = {
  // haike functions
  haikuCreate: haikuModule.create,
  haikuUpdate: haikuModule.update,
  haikeList: haikuModule.list
};

