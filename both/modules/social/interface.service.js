'use strict';

var social = require('./socialImpl/service');

exports.getPublicationsByKeyword = getPublicationsByKeyword;
exports.likePublication = likePublication;
exports.commentPublication = commentPublication;

///////////////////////////// Public functions /////////////////////////////////

function getPublicationsByKeyword(platform, keyWord) {
  var socialImpl = social.getSocialImpl(platform);

  return socialImpl.getPublicationsByKeyword(keyWord);
};

function likePublication(platform, publicationId) {
  var socialImpl = social.getSocialImpl(platform);

  return socialImpl.likePublication(publicationId);
};

function commentPublication(platform, publicationId, response) {
  var socialImpl = social.getSocialImpl(platform);

  return socialImpl.commentPublication(publicationId, response);
};