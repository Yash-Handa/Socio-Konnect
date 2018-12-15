var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
