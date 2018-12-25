// global middleware registered on the app instance
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
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

  app.use(compression({
    filter: shouldCompress,
  }));

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false,
  }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public/src')));
}

module.exports = setup;
