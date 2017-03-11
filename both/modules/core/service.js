'use strict';

var social = require('../social/interface.service');
var analyzeImageService = require('../analyzeImage/service');

var HASH_TAG = '#AdidasUcode2017029145';
var PLATFORM_TYPE = '';

exports.searchPublicationAndAnalyzeImages = searchPublicationAndAnalyzeImages;

///////////////////////////// Public functions /////////////////////////////////

function searchPublicationAndAnalyzeImages(platform) {
  PLATFORM_TYPE = platform;
  return social.getPublicationsByKeyword(PLATFORM_TYPE, HASH_TAG)
    .then(_processPublicationsAndRealizeSocialActions)
};

///////////////////////////// Private functions ////////////////////////////////

function _processPublicationsAndRealizeSocialActions(publications) {
  for (var i = 0; i < publications.length; i++) {
    // Analyze images of the publication
    _getFromPublicationAndAnalyzeImages(publications[i]);
  }
};

function _getFromPublicationAndAnalyzeImages(publication) {
  var images = publication.images;

  for (var i = 0; i < images.length; i++) {
    _sendToAnalyzeImageModule(images[i])
      .then(_socialPublish); 
  }
};

function _socialPublish(type) {
  if (type !== 'other') {
    // Set like the publication
    social.likePublication(PLATFORM_TYPE, publication.tweetId);

    // Comment the publication with the result
    _prepareAndPushComment(publication, type);
  }
};

function _prepareAndPushComment(publication, resultOfAnalyze) {
  var comment = '@' + publication.name + ' ¡Hola! Las zapatillas que aparecen '
    + 'en tu publicación son las adidas ' + resultOfAnalyze + '.';

  return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment);
};

function _sendToAnalyzeImageModule(image) {
  console.log('Sending image:', image);

  return analyzeImageService.analyzeImage(image);  
};