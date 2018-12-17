const mongoose = require('mongoose');
const debug = require('debug')('express-dev-env:Database');

// connecting mongoose with MongoBD database using env variables
mongoose.connect(process.env.DB_LINK, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
});
mongoose.connection
  .on('error', err => debug('Warning: ', err))
  .once('open', () => {
    debug('connected to the DB');
  });
