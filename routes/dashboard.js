const express = require('express');

const authChecker = require('../middlewares/auth/auth');
const senders = require('../middlewares/sender');
const profileUpdate = require('../middlewares/profileUpdate');

const router = express.Router();
router.use(authChecker);

router.get('/', (req, res) => {
  const { provider } = req.user;
  console.log(res.locals.introAgain);
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
    firstTime: (res.locals.introAgain) || (req.user.twitter ? false : req.user.firstTime),
    profilePicture: req.user.profilePic || picture,
    facebook: req.user.facebook,
    google: req.user.google,
    github: req.user.github,
    linkedin: req.user.linkedin,
    pinterest: req.user.pinterest,
    twitter: req.user.twitter,
  });
});

router.post('/send', senders, (req, res) => {
  // setTimeout(() => {
  //   res.status(200).json(req.body.map(data => ({
  //     from: data.sendTo,
  //     status: 'success',
  //   })));
  // }, 2000);

  res.status(200).json(res.locals.msgStatus);
});

router.get('/profile', (req, res) => {
  const { provider } = req.user;
  let picture = '';
  if (provider === 'local') picture = '/images/placeholder.png';
  // eslint-disable-next-line prefer-destructuring
  else picture = req.user[provider].picture;
  res.status(200).render('profile', {
    title: 'Profile',
    csrfToken: req.csrfToken(),
    username: req.user.username,
    email: req.user.email,
    firstTime: (res.locals.introAgain) || (req.user.twitter ? false : req.user.firstTime),
    profilePicture: req.user.profilePic || picture,
    twitterPic: req.user.twitter,
    linkedinPic: req.user.linkedin,
    googlePic: req.user.google,
    githubPic: req.user.github,
    facebookPic: req.user.facebook,
  });
});

router.post('/profile', profileUpdate, (req, res) => {
  res.status(201).send('Done');
});

module.exports = router;
