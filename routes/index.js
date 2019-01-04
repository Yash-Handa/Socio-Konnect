const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // console.log(process.env.SECRET_KEY);
  res.render('index', { title: 'SignIn-SighUp' });
});

router.get('/dashboard', (req, res) => {
  res.status(200).render('dashboard', {
    title: 'Dashboard',
  });
});

module.exports = router;
