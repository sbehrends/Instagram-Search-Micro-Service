// https://instagram.com/oauth/authorize/?client_id=[CLIENT_ID]&redirect_uri=http://localhost&response_type=token&scope=basic+public_content

var path = require('path'),
    env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 8000,
    instagram: {
      accessToken: process.env.INSTA_TOKEN || ''
    }
  },
  production: {
    port: process.env.PORT || 8000,
    instagram: {
      accessToken: process.env.INSTA_TOKEN || ''
    }
  }
};

module.exports = config[env];
