'use strict';

var CronJob = require('cron').CronJob;

var analyzeImageService = require('./modules/core/service');

new CronJob('00,15,30,45 * * * * *', function() {
  console.log('Analyzing tweets with the hashtag #adidasShoesBotify...');

  analyzeImageService.searchPublicationAndAnalyzeImages('twitter');
  analyzeImageService.searchPublicationAndReturnShopInfo('twitter');
  
}, null, true, 'Europe/Madrid');