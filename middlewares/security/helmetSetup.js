// security setup with Helmet
const helmet = require('helmet');

module.exports = app => {
  app.use(helmet());

  // Content Security policy
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'fonts.googleapis.com/icon'],
      fontSrc: ["'self'", 'fonts.gstatic.com/'],
    },
  }));
};
