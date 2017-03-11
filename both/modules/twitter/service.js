'use strict';

var Promise = require('bluebird');
var Twitter = require('twitter');

var config = require('../../config');
var TrendingTopic = require('./model');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

exports.getAndInsertTrendingTopic = getAndInsertTrendingTopic;

function getAndInsertTrendingTopic() {
  return _getTweets()
    .then(function(tweets) {
      var trendTweets = _processTrendArray(tweets.trends);

      var trendingObj = {
        trends: trendTweets
      };

      var trendingTopic = new TrendingTopic(trendingObj);
      return trendingTopic.save();
    })
    .catch(function(err) {
      console.log(err);
    })
};

function _getTweets() {
  return client.get('trends/place', {id: 779063})
    .then(function(tweets) {
      return tweets[0];
    })
};

function _processTrendArray(trends) {
  var newTrends = [];
  for (var i = 0; i < trends.length; i++) {
    var trendObj = {
      name: trends[i].name
    };

    newTrends.push(trendObj);
  }

  return newTrends;
};