const verify = require('../../middlewares/auth/verify');


module.exports = router => {
  router.get('/emailPrompt', verify.jwtCreator, verify.sender, (req, res) => {
    const { email, jwt } = res.locals;
    res.status(200).render('emailSend', {
      title: 'Email Confirmation',
      csrfToken: req.csrfToken(),
      jwt,
      email,
      error_msg: res.locals.error_msg,
      success_msg: res.locals.success_msg,
    });
  });

  router.post('/emailPrompt', (req, res, next) => {
    req.flash('email', req.body.resend);
    req.flash('jwt', req.body.jwt);
    res.locals.email = req.body.resend;
    res.locals.jwt = req.body.jwt;
    next();
  }, (req, res) => {
    req.flash('success_msg', `The mail is Resent to ${req.body.resend}`);
    res.status(304).redirect('/auth/emailPrompt');
  });

  router.get('/confirmation/:jwt', verify.checker);
};
