'use strict';

var _ = require('lodash');

var social = require('../social/interface.service');
var analyzeImageService = require('../analyzeImage/service');
var adidasShopService = require('../shopAdidas/service');

var HASH_TAG = '#adidasShoesBotify';
var HASH_TAG_PLACE = '#findMyAdidasShop';
var PLATFORM_TYPE = '';

var MAP_URL = 'http://discover.adidas.co.uk/storefinder/';
var SHOP_ADIDAS = 'http://www.adidas.es/search?q=';

var PUBLICATIONS_ID_IMAGE = [];
var PUBLICATIONS_ID_SHOP = [];

exports.searchPublicationAndAnalyzeImages = searchPublicationAndAnalyzeImages;
exports.searchPublicationAndReturnShopInfo = searchPublicationAndReturnShopInfo;

///////////////////////////// Public functions /////////////////////////////////

function searchPublicationAndAnalyzeImages(platform) {
  PLATFORM_TYPE = platform;
  return social.getPublicationsByKeyword(PLATFORM_TYPE, HASH_TAG)
    .then(_processPublicationsAndRealizeSocialActions);
};

function searchPublicationAndReturnShopInfo(platform) {
  PLATFORM_TYPE = platform;
  return social.getPublicationsByKeyword(PLATFORM_TYPE, HASH_TAG_PLACE)
    .then(_processPublicationsAndGetShopInfo);
};

///////////////////////////// Private functions ////////////////////////////////

function _processPublicationsAndRealizeSocialActions(publications) {
  for (var i = 0; i < publications.length; i++) {
    // Analyze images of the publication
    if (!_.includes(PUBLICATIONS_ID_IMAGE, publications[i].tweetId)) {
      _getFromPublicationAndAnalyzeImages(publications[i]);
      PUBLICATIONS_ID_IMAGE.push(publications[i].tweetId);
    }
  }
};

function _processPublicationsAndGetShopInfo(publications) {
  for (var i = 0; i < publications.length; i++) {
    // Analyze images of the publication
    if (!_.includes(PUBLICATIONS_ID_SHOP, publications[i].tweetId)) {
      _prepareAndPushCommentShop(publications[i]);
      PUBLICATIONS_ID_SHOP.push(publications[i].tweetId);
    }
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
  var shop_adidas_url = SHOP_ADIDAS + resultOfAnalyze.replace(' ', '%20');

  // Comments to post into publication
  var comment = '@' + publication.name + ' ¡Hola! Las zapatillas que aparecen '
    + 'en tu publicación son las adidas ' + resultOfAnalyze;

  return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment)
    .then(function(result) {
      var comment2 = '@' + publication.name + ' Encuentralas aquí: ' + shop_adidas_url  
        + ' o en tu tienda más cercana: ' + MAP_URL;

      return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment2);
    })
    .then(function(result) {  
      var comment3 = '@' + publication.name + ' Si desea conocer su tienda adidas más cercana,'
        + ' twittee #findMyAdidasShop (necesario indicar su ubicación)';

      return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment3);
    })
    .catch(function(err) {
      console.log(err)
    })
};

function _prepareAndPushCommentShop(publication) {
  var shopAdidas;
  return adidasShopService.getShopInfo(publication.coordinates.lat, publication.coordinates.lng)
    .then(function(_shopAdidas) {
      shopAdidas = _shopAdidas;

      var comment = '@' + publication.name + ' La tienda adidas más cercana se encuentra a ' 
        + shopAdidas.distance + ' km de distancia. (tweet 1/3)';

      return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment);
    })
    .then(function(result) {
      var comment2 = '@' + publication.name + ' La información de esta tienda es:\n'
        + shopAdidas.name + ', ' + shopAdidas.street1 + ', ' + shopAdidas.phone + '. (tweet 2/3)';

      return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment2);
    })
    .then(function(result) { 
      var comment3 = '@' + publication.name + ' Puedes encontrar la tienda en el siguiente mapa: '
        + 'http://maps.google.com/?q=' + shopAdidas.latitude_google + ',' + shopAdidas.longitude_google + ' (tweet 3/3)';

      return social.commentPublication(PLATFORM_TYPE, publication.tweetId, comment3);
    })
};

function _sendToAnalyzeImageModule(image) {
  console.log('Sending image:', image);

  return analyzeImageService.analyzeImage(image);  
};