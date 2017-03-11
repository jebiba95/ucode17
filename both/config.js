const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/app'
  },
  twitter: {
  	consumer_key: 'hd0dvD4Yoiu6BF7s8vpA2gD73',
  	consumer_secret: 'uXvGl6Qqc3EaeXsf3gLQBF4Vu1sq09G5gEHBCOtRH2q48k24d9',
  	access_token_key: '840512908324945920-olev2wKLH2rMKRsSvEiiv8cMr9wjoET',
  	access_token_secret: 'xlowoPrhfSySAn79CrejtmNpB8yD1rfmoOYcUBriYjcJo'
  }
};

module.exports = config;
