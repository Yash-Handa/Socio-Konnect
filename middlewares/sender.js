const Twitter = require('twitter');
const debug = require('debug')('SocioKonnect:PostSender');

const config = require('../bin/config/config');

module.exports = [
  function (req, res, next) {
    // very important for storing the msg to be send to client
    res.locals.msgStatus = [];

    const facebook = req.body.find(ele => ele.sendTo === 'facebook');
    if (facebook) {
      debug(facebook.data.join('\n'));
      next();
    } else {
      next();
    }
  },
  function (req, res, next) {
    const google = req.body.find(ele => ele.sendTo === 'google');
    if (google) {
      debug(google.data);
      next();
    } else {
      next();
    }
  },
  function (req, res, next) {
    const github = req.body.find(ele => ele.sendTo === 'github');
    if (github) {
      debug(github.data);
      next();
    } else {
      next();
    }
  },
  function (req, res, next) {
    const twitter = req.body.find(ele => ele.sendTo === 'twitter');
    if (twitter) {
      const client = new Twitter({
        consumer_key: config.twitterId,
        consumer_secret: config.twitterSecret,
        access_token_key: req.user.twitter.token,
        access_token_secret: req.user.twitter.tokenSecret,
      });

      client.post('statuses/update', { status: twitter.data.join('\n') })
        .then(() => {
          res.locals.msgStatus.push({
            from: 'twitter',
            status: 'success',
          });
          next();
        })
        .catch(err => {
          debug('twitter: ', err);
          res.locals.msgStatus.push({
            from: 'twitter',
            status: 'error',
          });
          next();
        });
    } else {
      next();
    }
  },
  function (req, res, next) {
    const linkedin = req.body.find(ele => ele.sendTo === 'linkedin');
    if (linkedin) {
      debug(linkedin.data);
      next();
    } else {
      next();
    }
  },
  function (req, res, next) {
    const pinterest = req.body.find(ele => ele.sendTo === 'pinterest');
    if (pinterest) {
      debug(pinterest.data);
      next();
    } else {
      next();
    }
  },
];
