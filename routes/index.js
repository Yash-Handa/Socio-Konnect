const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // console.log(process.env.SECRET_KEY);
  res.render('index', {
    title: 'Socio Konnect',
    success_msg: res.locals.success_msg,
  });
});

module.exports = router;
