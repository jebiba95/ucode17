'use strict';

var CronJob = require('cron').CronJob;

new CronJob('00,15,30,45 * * * * *', function() {
  console.log('GET Trending topics tweets of Zaragoza...');

  
}, null, true, 'Europe/Madrid');