// security setup with Helmet
const helmet = require('helmet');

module.exports = app => {
  app.use(helmet());

  // Content Security policy
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      // styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'] for bootstrap cdn css only
    },
  }));
};
