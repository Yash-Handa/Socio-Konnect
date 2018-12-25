/**
 * config object has all the configurational options
 * like all the `secrets` present in the `.env` file which
 * are common for `development`, `production` or `testing` env
 *
 * this is used for the reason of not accessing `process object` in business logics
 * and bifurcating configurational options based on the `NODE_ENV variable` in `.env file`
 * or as set by the cloud service providers (`development`, `production` or `testing`)
 */

const config = {
  dev: 'development',
  prod: 'production',
  test: 'testing',
  dbLink: process.env.DB_LINK,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS,
  dbUser: process.env.DB_USER,
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

let envConfig;

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
try {
  envConfig = require(`./${config.env}`) || {};
} catch (err) {
  envConfig = {};
}

/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
for (const attr in envConfig) { config[attr] = envConfig[attr]; }

module.exports = config;
