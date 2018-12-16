const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

// Example of next('route')
router.get('/:id', (req, res, next) => {
  if (req.params.id === '0') {
    next('route');
  } else {
    res.send('regular');
  }
});

router.get('/:id', (req, res) => {
  res.send('special');
});

module.exports = router;
