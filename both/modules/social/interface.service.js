'use strict';

var social = require('./socialImpl/service');

exports.getPublicationsByKeyword = getPublicationsByKeyword;
exports.likePublication = likePublication;
exports.commentPublication = commentPublication;

function getPublicationsByKeyword(keyWord) {
  var socialImpl = social.getSocialImpl('twitter');

  return socialImpl.getPublicationsByKeyword(keyWord);
};

function likePublication(publicationId) {
  var socialImpl = social.getSocialImpl('twitter');

  return socialImpl.likePublication(publicationId);
};

function commentPublication(publicationId, response) {
  var socialImpl = social.getSocialImpl('twitter');

  return socialImpl.commentPublication(publicationId, response);
};