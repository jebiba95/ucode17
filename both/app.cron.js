'use strict';

var CronJob = require('cron').CronJob;

var analyzeImageService = require('./modules/core/service');

new CronJob('00,15,30,45 * * * * *', function() {
  console.log('Analytics tweets with the hashtag #quieroEsasAdidasUcode...');

  analyzeImageService.searchPublicationAndAnalyzeImages('twitter');
  
}, null, true, 'Europe/Madrid');