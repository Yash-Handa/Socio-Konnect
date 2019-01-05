const express = require('express');

const authChecker = require('../middlewares/users/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // console.log(process.env.SECRET_KEY);
  res.render('index', { title: 'SignIn-SighUp' });
});

router.get('/dashboard', authChecker, (req, res) => {
  res.status(200).render('dashboard', {
    title: 'Dashboard',
    username: req.user.username,
  });
});

module.exports = router;
