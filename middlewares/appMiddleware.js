/* eslint-disable prefer-destructuring */
// global middleware registered on the app instance
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const compression = require('compression');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
// const MongoStore = require('connect-mongo')(session);
const express = require('express');

const security = require('./security/globalSecurity');
const passportSetup = require('./passport/passportSetup');
const helmetSetup = require('./security/helmetSetup');

// gzip compression of response object using Compression
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

// MongoStore.on('create', (id) => console.log('session id', id));

// eslint-disable-next-line no-unused-vars
function setup(app, connectDB) {
  helmetSetup(app);
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
  app.use(express.static(path.join(__dirname, '../public/src')));
  app.use(express.static(path.join(__dirname, '../node_modules/materialize-css/dist')));
  app.use(express.static(path.join(__dirname, '../node_modules/animate.css')));
  app.use(cookieParser());

  // added express-session for persistent logins
  app.use(session({
    secret: 'mySecretCookieSalt',
    // store: new MongoStore({ mongooseConnection: connectDB.connection, clear_interval: 3600 }),
    // un comment the above line when using connect-mongo gor multiple processes
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000, // 1hr
      // secure: true, // in production (can use config directory)
      // domain: config.host,
      path: '/',
    },
  }));

  // setup passport configurations
  passportSetup(app);

  // connect-flash added for flash messages
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.email = req.flash('email')[0] || res.locals.email;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.jwt = req.flash('jwt')[0] || res.locals.jwt;
    next();
  });

  // setup the security settings present in the security file
  security(app);
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
