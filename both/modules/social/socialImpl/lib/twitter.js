'use strict';

var Promise = require('bluebird');
var Twitter = require('twitter');

var config = require('../../../../config');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

exports.getPublicationsByKeyword = getPublicationsByKeyword;

function getPublicationsByKeyword(keyWord) {
  return _getTweets(keyWord);
};

function _getTweets(keyWord) {
  return client.get('search/tweets', {q: keyWord})
    .then(function(tweets) {
      return _processTweets(tweets);
    })
};

function _processTweets(tweets) {
  var newTweets = [];
  var tweetArray = tweets.statuses;

  for (var i = 0; i < tweetArray.length; i++) {
    var tweetObj = {
      name: tweetArray[i].user.screen_name,
      images: _getImagesFromTweet(tweetArray[i].entities.media),
      tweetId: tweetArray[i].id
    };

    newTweets.push(tweetObj);
  }

  return newTweets;
};

function _getImagesFromTweet(tweetMedia) {
  var images = [];

  if (tweetMedia) {
    for (var i = 0; i < tweetMedia.length; i++) {
      images.push(tweetMedia[i].media_url);
    }
  }

  return images;
}