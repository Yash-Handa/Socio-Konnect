// security setup with Helmet
const helmet = require('helmet');

module.exports = app => {
  app.use(helmet());

  // Content Security policy
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'fonts.googleapis.com/', 'use.fontawesome.com/', "'unsafe-inline'"],
      fontSrc: ["'self'", 'fonts.gstatic.com/', 'use.fontawesome.com/'],
      scriptSrc: ["'self'", 'use.fontawesome.com/'],
      imgSrc: ["'self'", 'lh6.googleusercontent.com/', 'media.licdn.com', 'avatars0.githubusercontent.com', 'platform-lookaside.fbsbx.com'],
    },
  }));
};
