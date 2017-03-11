'use strict';

var Promise = require('bluebird');

var social = require('./socialImpl/service');

exports.getPublicationsByKeyword = getPublicationsByKeyword;

function getPublicationsByKeyword(keyWord) {
  var socialImpl = social.getSocialImpl('twitter');

  return socialImpl.getPublicationsByKeyword(keyWord);
};