// global middleware registered on the app instance
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const compression = require('compression');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const express = require('express');

const security = require('./security/globalSecurity');
const passport = require('./passport/passportSetup');

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
  // compressing the response object
  app.use(compression({
    filter: shouldCompress,
  }));

  // serving a dummy favicon
  app.use(favicon(path.join(__dirname, '../public', 'src', 'images', 'favicon32x32.ico')));

  // logging requests to the console using morgan
  app.use(logger('dev'));
  app.use(cookieParser());

  // added express-session for persistent logins
  app.use(session({
    secret: 'mySecretCookieSalt',
    cookie: {
      httpOnly: true,
      secure: true, // in production (can use config directory)
      // domain: 'example.com',
      path: '/',
      // Cookie will expire in 1 hour from when it's generated
      // expires: new Date( Date.now() + 60 * 60 * 1000 )
    },
  }));

  // connect-flash added for flash messages
  app.use(flash());
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false,
  }));

  // setup the security settings present in the security file
  security(app);

  // setup passport configurations
  passport(app);
  app.use(express.static(path.join(__dirname, '../public/src')));
  app.use(express.static(path.join(__dirname, '../node_modules/materialize-css/dist')));
  app.use(express.static(path.join(__dirname, '../node_modules/animate.css')));
  app.use(express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free/css')));
}

module.exports = setup;

// secure way to use express-session package if needed

// app.use(session({
//   secret: 'mySecretCookieSalt',
//   key: 'myCookieSessionId',
//   cookie: {
//     httpOnly: true,
//     secure: true, // in production (can use config directory)
//     domain: 'example.com',
//     path: '/foo/bar',
//     // Cookie will expire in 1 hour from when it's generated
//     expires: new Date( Date.now() + 60 * 60 * 1000 )
//   }
// }));

// use connect-mongo for effective session storage
