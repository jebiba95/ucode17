'use strict';

var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);

exports.analyzeImage = analyzeImage;

///////////////////////////// Public functions /////////////////////////////////

function analyzeImage(image) {
  var PATH_PYTHON_ROUTE = __dirname + '/../../analyzeImageModule/';
  var SCRIPT_PYTHON = 'classifier.py';

  var queryRequest = 'python ' + PATH_PYTHON_ROUTE + SCRIPT_PYTHON + ' ' + image;
  var result = '';

  return exec(queryRequest);
  
};