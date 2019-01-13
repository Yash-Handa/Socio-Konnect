const csurfSetup = require('./csurfSetup');

module.exports = app => {
  // global CSURF setup
  app.use(csurfSetup);
};
