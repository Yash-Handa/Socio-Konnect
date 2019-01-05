require('dotenv').config({ path: './bin/.env' });
const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const path = require('path');

require('./DB/connect');
const appMiddleware = require('./middlewares/appMiddleware');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add global middlewares to the app instance
appMiddleware(app);

app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
require('./middlewares/appErrorMiddleware')(app);

module.exports = app;
