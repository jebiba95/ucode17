'use strict';

var mongoose = require('mongoose');

var TrendingTopicSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    default: Date.now,
    required: true,
    index: true
  },
  trends: [mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('TrendingTopic', TrendingTopicSchema);