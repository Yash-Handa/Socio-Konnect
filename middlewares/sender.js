const Twitter = require('twitter');
const axios = require('axios');
const FB = require('fb');
const debug = require('debug')('SocioKonnect:PostSender');

const config = require('../bin/config/config');

module.exports = [
  function (req, res, next) {
    // very important for storing the msg to be send to client
    res.locals.msgStatus = [];

    const facebook = req.body.find(ele => ele.sendTo === 'facebook');
    if (facebook) {
      FB.setAccessToken(req.user.facebook.accessToken);
      const body = facebook.data.join('\n');
      // `${req.user.facebook.id}/feed`
      FB.api('me/feed', 'post', { message: body }, (response) => {
        if (!response || response.error) {
          debug(!response ? 'error occurred' : response.error);
          res.locals.msgStatus.push({
            from: 'facebook',
            status: 'error',
          });
          next();
        } else {
          res.locals.msgStatus.push({
            from: 'facebook',
            status: 'success',
          });
          next();
        }
      });
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
      const data = {
        author: `urn:li:person:${req.user.linkedin.id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: linkedin.data.join('\n'),
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };
      axios.post('https://api.linkedin.com/v2/ugcPosts', data, {
        headers: {
          'X-Restli-Protocol-Version': '2.0.0',
          Authorization: `Bearer ${req.user.linkedin.accessToken}`,
        },
      })
        .then((response) => {
          res.locals.msgStatus.push({
            from: 'linkedin',
            status: 'success',
          });
          debug('linkedin: ', response);
          next();
        })
        .catch(err => {
          debug('linkedin: ', err);
          res.locals.msgStatus.push({
            from: 'linkedin',
            status: 'error',
          });
          next();
        });
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
