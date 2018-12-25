// global error handler registered at the end of the end of the app middleware stack

/*
If you pass an error to next() and you do not handle it in a custom error handler,
it will be handled by the built-in error handler;
the error will be written to the client with the stack trace.
The stack trace is not included in the production environment.
*/
function handler(app) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}

module.exports = handler;
