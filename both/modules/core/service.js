'use strict';

var social = require('../social/interface.service');
var analyzeImageService = require('../analyzeImage/service');

var HASH_TAG = '#jesusPaqueteEstelar';
var PLATFORM_TYPE = '';
var MAP_URL = 'http://discover.adidas.co.uk/storefinder/';
var SHOP_ADIDAS = 'http://www.adidas.es/search?q=';

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
    var customSocialPublish = _socialPublish.bind(null, publication);
    _sendToAnalyzeImageModule(images[i])
      .then(customSocialPublish); 
  }
};

function _socialPublish(publication, type) {
  if (type !== 'other') {
    // Set like the publication
    social.likePublication(PLATFORM_TYPE, publication.tweetId);

    // Comment the publication with the result
    _prepareAndPushComment(publication, type);
  }
};

function _prepareAndPushComment(publication, resultOfAnalyze) {
  var shop_adidas_url = SHOP_ADIDAS + resultOfAnalyze;

  // Comments to post into publication
  var comment = '@' + publication.name + ' ¡Hola! Las zapatillas que aparecen '
    + 'en tu publicación son las adidas ' + resultOfAnalyze + '.';
  var comment2 = '@' + publication.name + ' Encuentralas aquí: ' + shop_adidas_url  + ' o en tu tienda más cercana: ' + MAP_URL;

  return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment)
    .then(function(result) {
      return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment2);
    })
};

function _sendToAnalyzeImageModule(image) {
  console.log('Sending image:', image);

  return analyzeImageService.analyzeImage(image);  
};