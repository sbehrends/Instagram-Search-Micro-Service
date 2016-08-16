'use strict';

const Hapi = require('hapi');
const config = require('./config');
const ig = require('instagram-node').instagram();

// Setup Instagram API
ig.use({
  access_token: config.instagram.accessToken
});

let userMedia = (userId, cb) => {
  ig.user_media_recent(userId, function(err, medias, pagination, remaining, limit) {
    if (err) {
        return cb(err);
      }

      cb(null, medias);
  });
};

let tagMedia = (tag, cb) => {
  ig.tag_media_recent(tag, function(err, medias, pagination, remaining, limit) {
    if (err) {
      return cb(err);
    }

    cb(null, medias);
  });
};

const server = new Hapi.Server();
server.connection({
    port: config.port
});

server.route({
  method: 'GET',
  path:'/user/{user}',
  handler: function (request, reply) {
    const user = encodeURIComponent(request.params.user);
    userMedia(user, (err, media) => {
      if (err) {
        return reply(new Error('Internal Server Error'))
      }

      return reply(media);
    });

  }
});

server.route({
  method: 'GET',
  path:'/tag/{tag}',
  handler: function (request, reply) {
    const tag = encodeURIComponent(request.params.tag);
    tagMedia(tag, (err, media) => {
      if (err) {
        return reply(new Error('Internal Server Error'))
      }

      return reply(media);
    });

  }
});

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log('Server running at:', server.info.uri);
});
