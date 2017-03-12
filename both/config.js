const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/app'
  },
  twitter: {
  	consumer_key: 'xBCzTI9zATPPBg1ivthObDlvd',
  	consumer_secret: 'tIIZA8oVNrchgckoMQNAhaApQOf03Igs1I410mm84q2hYupLbR',
  	access_token_key: '840512908324945920-ByFlVcgoVPu07Ki7DXJBJaZAttegrE3',
  	access_token_secret: 'XJ9pe80WW0Sq5jSnXHTg6ZAoSZIQRZbHw5wqbquKSau05'
  }
};

module.exports = config;
