'use strict';

var CronJob = require('cron').CronJob;

var social = require('./modules/social/interface.service');

new CronJob('00,15,30,45 * * * * *', function() {
  console.log('GET Trending topics tweets of Zaragoza...');

  social.getPublicationsByKeyword('#EstoEsUnaPrueba2019345')
    .then(function(tweets) {
      var response = '@' + tweets[0].name + ' soy el puto amo!';
      social.commentPublication(tweets[0].tweetId, response);
    })
  
}, null, true, 'Europe/Madrid');