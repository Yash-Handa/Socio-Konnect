# Express-Dev-Env

The development environment for Express with Front end boiler plates

>## The app is made using Express generator(v 4.16.0) with handlebars and runs on port 1998

## Express Security

For security **Helmet** is used with its defaults and additionally **Content Security Policy**

* **Helmet** - [npm Doc](https://www.npmjs.com/package/helmet)
* **Content Security Policy** - [Helmet Doc](https://helmetjs.github.io/docs/csp/)

## Response Compression

The response object is gzip compressed using [compression](https://www.npmjs.com/package/compression). To request for an uncompressed response use **x-no-compression** in the request header.

## NPM Commands

* `npm install` - installs all the dependencies
* `npm start` - lints the server and client script, starts eslint on watch mode on server scripts and starts the project at **localhost:1998** in debug mode.
* `npm run start-w` - Restarts the server(using nodemon) on every save and lints the server and client side scripts on each save.
* `npm run start-w-lite` - Simply restarts the server(using nodemon) on every save.
* `npm run lint-server` - lints the server scripts (all scripts except that in node_module and public directory) once.
* `npm run lint-client` - lints the client scripts (all scripts in the public directory) once.
* `npm run lint-w` - starts the linter in watch mode. When called from root directory it watches the server scripts and when called in public directory it watches the client scripts.
* `npm run localTunnel` - exposes **localhost:1998** to the world wide web
* `npm run lt` - runs `npm start` and `npm run localTunnel` in parallel

>Use `npm run --silent <your-script>` to hide the internal logs from your terminal window.<br>eg: `npm run --silent start-w` or `npm run --silent start-w-lite`

## Notes

* Use as many Asynchronous functions as possible to reduce the server response time and occupance.
* Deal properly with errors or the server will crash use try/catch(for synchronous) and Promises(for asynchronous) errors with the next(err) method.
* Read this for production and devops ready configurations [Things to do in your environment / setup](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production)

## To-Do

* Use cookies securely
* Add proper Logging ([Bunyan](https://github.com/trentm/node-bunyan) or [Winston](https://github.com/winstonjs/winston))
