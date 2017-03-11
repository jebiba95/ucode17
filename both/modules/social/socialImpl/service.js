'use strict';

exports.getSocialImpl = getSocialImpl;

///////////////////////////// Public functions /////////////////////////////////

function getSocialImpl(socialName) {
  switch(socialName) {
    case 'twitter':
      return require('./lib/twitter');

    default:
      return require('./lib/twitter');
  }
};