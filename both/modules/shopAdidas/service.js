'use strict';

var Promise = require('bluebird');
var request =  Promise.promisifyAll(require('request'));

exports.getShopInfo = getShopInfo;

///////////////////////////// Public functions /////////////////////////////////


function getShopInfo(lat, lng) {
  var urlRequest = 'http://placesws.adidas-group.com/API/search?'
    + 'method=get&brand=adidas&category=store&geoengine=google&format=json';
  var urlAdidas = urlRequest + '&latlng=' + lat + ',' + lng + ',5';

  return request.getAsync(urlAdidas)
    .then(function(res, err) { 
      var body = res.body;
      return JSON.parse(body.substring(1, body.length));
    })
    .then(function(result) {
      return result.wsResponse.result[0];
    })
};