const helmetSetup = require('./helmetSetup');
const csurfSetup = require('./csurfSetup');

module.exports = app => {
  helmetSetup(app);

  // global CSURF setup
  app.use(csurfSetup);
};
