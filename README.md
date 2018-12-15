# Express-Dev-Env

The development environment for Express with Front end boiler plates

## Express Security

For security **Helmet** is used with its defaults and additionally **Content Security Policy**

* **Helmet** - [npm Doc](https://www.npmjs.com/package/helmet)
* **Content Security Policy** - [Helmet Doc](https://helmetjs.github.io/docs/csp/)

## Response Compression

The response object is gzip compressed using [compression](https://www.npmjs.com/package/compression). To request for an uncompressed response use **x-no-compression** in the request header.

## Notes

* Use as many Asynchronous functions as possible to reduce the server response time and occupance.
* Deal properly with errors or the server will crash use try/catch(for synchronous) and Promises(for asynchronous) errors with the next(err) method.
* Read this for production and devops ready configurations [Things to do in your environment / setup](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)

## To-Do

* Use cookies securely
* Add proper Logging ([Bunyan](https://github.com/trentm/node-bunyan) or [Winston](https://github.com/winstonjs/winston))
