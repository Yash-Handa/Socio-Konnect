const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // console.log(process.env.SECRET_KEY);
  res.render('index', { title: 'SignIn-SighOut' });
});

module.exports = router;
