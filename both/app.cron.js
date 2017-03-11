'use strict';

var CronJob = require('cron').CronJob;

var social = require('./modules/social/interface.service');

new CronJob('00,15,30,45 * * * * *', function() {
  console.log('GET Trending topics tweets of Zaragoza...');

  social.getPublicationsByKeyword('#ucodebyadidas2017')
    .then(function(tweets) {
      console.log(tweets)
    })
  
}, null, true, 'Europe/Madrid');