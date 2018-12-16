const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // console.log(process.env.SECRET_KEY);
  res.render('index', { title: 'Express' });
});

// Example of a post request
router.post('/', (req, res) => {
  res.status(200).json(req.body);
});

// Example of accessing app (Application) object in a req/res cycle
router.get('/test', (req, res) => {
  res.status(200).send(res.app.locals);
});

// Example 1 of parameter in router
router.get('/flights/:from-:to', (req, res) => {
  res.send(req.params);
});

// Example 2 of parameter in router and array of middleware
const admin = (req, res, next) => {
  req.params.status = 'admin';
  next();
};

const email = (req, res, next) => {
  req.params.email = 'abc@xyz.com';
  next();
};

router.get('/:firstName/:lastName', [admin, email], (req, res) => {
  res.send(req.params);
});

// Example of res.status(200).download()
router.get('/down', (req, res) => {
  res.download('README.md');
});

// Example of res.status(200).redirect()
router.get('/info', (req, res) => {
  res.redirect('/users');
});

module.exports = router;
