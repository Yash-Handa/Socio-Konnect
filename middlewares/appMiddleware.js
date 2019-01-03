// global middleware registered on the app instance
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const compression = require('compression');
const path = require('path');
const express = require('express');

// gzip compression of response object using Compression
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

function setup(app) {
  // security setup with Helmet
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      // styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'] for bootstrap cdn css only
    },
  }));

  // compressing the response object
  app.use(compression({
    filter: shouldCompress,
  }));

  // serving a dummy favicon
  app.use(favicon(path.join(__dirname, '../public', 'src', 'images', 'favicon32x32.ico')));

  // logging requests to the console using morgan
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false,
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public/src')));
}

module.exports = setup;

// app.use(session({
//   secret: 'mySecretCookieSalt',
//   key: 'myCookieSessionId',
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     domain: 'example.com',
//     path: '/foo/bar',
//     // Cookie will expire in 1 hour from when it's generated
//     expires: new Date( Date.now() + 60 * 60 * 1000 )
//   }
// }));

// const limiter = require('express-limiter')(app, redisClient);

// // Limit requests to 100 per hour per ip address.
// limiter({
//   lookup: ['connection.remoteAddress'],
//   total: 100,
//   expire: 1000 * 60 * 60
// }),
