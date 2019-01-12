const express = require('express');

const authChecker = require('../middlewares/auth/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // console.log(process.env.SECRET_KEY);
  res.render('index', {
    title: 'SignIn-SignUp',
    success_msg: res.locals.success_msg,
  });
});

router.get('/dashboard', authChecker, (req, res) => {
  const { provider } = req.user;
  let picture = '';
  if (provider === 'local') picture = '/images/placeholder.png';
  else if (provider === 'facebook') picture = req.user.facebook.picture.data.url;
  // eslint-disable-next-line prefer-destructuring
  else picture = req.user[provider].picture;
  res.status(200).render('dashboard', {
    title: 'Dashboard',
    username: req.user.username,
    email: req.user.email,
    provider: req.user.provider,
    profilePicture: picture,
  });
});

module.exports = router;
