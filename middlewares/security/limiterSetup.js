// limiter is setup but is NEVER USED require this file where you want this to use
const { RateLimiter } = require('limiter');
// Allow 150 requests per hour (the Twitter search limit). Also understands
// 'second', 'minute', 'day', or a number of milliseconds
const limiter = new RateLimiter(150, 'hour', true); // fire CB immediately

module.exports = (req, res, next) => {
  // Throttle requests (remove 1 token every time called)
  limiter.removeTokens(1, (err, remainingRequests) => {
    // err will only be set if we request more than the maximum number of
    // requests we set in the constructor

    // remainingRequests tells us how many additional requests could be sent
    // right this moment

    if (remainingRequests < 1) {
      res.writeHead(429, { 'Content-Type': 'text/plain;charset=UTF-8' });
      res.end('429 Too Many Requests - your IP is being rate limited');
    } else {
      next();
    }
  });
};
