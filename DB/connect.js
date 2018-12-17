const mongoose = require('mongoose');
const debug = require('debug')('express-dev-env:Database');

// connecting mongoose with MongoBD database using env variables
mongoose.connect(process.env.DB_NAME);
mongoose.connection
  .on('error', err => debug('Warning: ', err))
  .once('open', () => {
    debug('connected to the DB');
  });
