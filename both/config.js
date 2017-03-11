const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/app'
  },
  twitter: {
  	consumer_key: 'aoaDSv1fVRaRB5MjipgU2ZwBi',
  	consumer_secret: 's8zJN53nL1N1v6IzSucmLyy9uBleTd68YKM7EZ9rBXrwm3VIHE',
  	access_token_key: '1538763368-k6xoBObzDXtpA4ZIbxVXMJ2tSfinrKPFfy7FKv2',
  	access_token_secret: 'vIp5316YQva3Cvh3zQx4bFd52ymDqVFLygRm4qhreMULL'
  }
};

module.exports = config;
