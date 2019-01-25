const express = require('express');

const authChecker = require('../middlewares/auth/auth');

const router = express.Router();
router.use(authChecker);

router.get('/', (req, res) => {
  const { provider } = req.user;
  let picture = '';
  if (provider === 'local') picture = '/images/placeholder.png';
  // eslint-disable-next-line prefer-destructuring
  else picture = req.user[provider].picture;
  res.status(200).render('dashboard', {
    title: 'Dashboard',
    csrfToken: req.csrfToken(),
    error_msg: res.locals.error_msg,
    error: res.locals.error,
    username: req.user.username,
    email: req.user.email,
    provider: req.user.provider,
    profilePicture: picture,
    facebook: req.user.facebook,
    google: req.user.google,
    github: req.user.github,
    linkedin: req.user.linkedin,
    pinterest: req.user.pinterest,
    twitter: req.user.twitter,
  });
});

router.post('/send', (req, res) => {
  setTimeout(() => {
    res.status(200).json(req.body.map(data => ({
      from: data.sendTo,
      status: 'success',
    })));
  }, 2000);
});

module.exports = router;
