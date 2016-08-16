// https://instagram.com/oauth/authorize/?client_id=[CLIENT_ID]&redirect_uri=http://localhost&response_type=token&scope=basic+public_content

var path = require('path'),
    env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: 8000 || process.env.PORT,
    instagram: {
      accessToken: '' || process.env.INSTA_TOKEN
    }
  },
  production: {
    port: 8000 || process.env.PORT,
    instagram: {
      accessToken: '' || process.env.INSTA_TOKEN
    }
  }
};

module.exports = config[env];
