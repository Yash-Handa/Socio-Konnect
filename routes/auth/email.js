// const email = (req, res, next) => {
//   // create and send the mail
// };


module.exports = router => {
  router.get('/emailPrompt', (req, res) => {
    const { email } = res.locals;
    res.status(200).render('emailSend', {
      title: 'Email Confirmation',
      csrfToken: req.csrfToken(),
      email,
      error_msg: res.locals.error_msg,
      success_msg: res.locals.success_msg,
    });
  });

  router.post('/emailPrompt', (req, res) => {
    req.flash('email', req.body.resend);
    req.flash('success_msg', `The mail is Resent to ${req.body.resend}`);
    res.status(304).redirect('/users/emailPrompt');
  });
};
