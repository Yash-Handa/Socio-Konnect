# Socio Konnect

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c0cb8be28a7d446aa0aa4f0a8837d5b6)](https://app.codacy.com/app/yashhanda7/Socio-Konnect?utm_source=github.com&utm_medium=referral&utm_content=Yash-Handa/Socio-Konnect&utm_campaign=Badge_Grade_Dashboard)
[![Codeship Status for Yash-Handa/Socio-Konnect](https://app.codeship.com/projects/849adba0-f99d-0136-ae21-1a0cd865de7f/status?branch=master)](/projects/321418)
![code size](https://img.shields.io/github/languages/code-size/Yash-Handa/Socio-Konnect.svg?style=flat-square)
![licence](https://img.shields.io/github/license/Yash-Handa/Socio-Konnect.svg?style=flat-square)
![dependencies](https://img.shields.io/david/Yash-Handa/Socio-Konnect.svg?style=flat-square)
![dev-dependencies](https://img.shields.io/david/dev/Yash-Handa/Socio-Konnect.svg?style=flat-square)

<div>
<span align="left">
  <img alt="Tour" style="float: left" width="45%" title="Tour of the App" src="/readme content/tour.gif">
</span>

<span align="right">
  <img alt="Register" width="45%" style="float: right" title="Register to the App" src="/readme content/register.gif">
</span>

</div><br>

A fun project which provides Complete **Authentication and Registration** of all users with:

* **[Google](https://www.npmjs.com/package/passport-google-oauth)**
* **[Facebook](https://www.npmjs.com/package/passport-facebook)**
* **[GitHub](https://www.npmjs.com/package/passport-github)**
* **[LinkedIn](https://www.npmjs.com/package/passport-linkedin-oauth2)**
* **[Local Email](https://www.npmjs.com/package/passport-local)**

### SERVER

The Server is made on `Node.js` (v10.12.0)  
`Express.js` is used as the server framework (v4.16.0)

### DATABASE

The database used is `MongoDB` and is hosted on a `MongoDB Atlas Cluster`.  
`Mongoose.js` is used as an ODM (v5.4.1)

### FRONT-END

The Front-end is made with `Vanilla HTML, CSS and JS`.  
`Materialize.css` is used for better styling of the project.  
`Font Awesome` for icons  
`and Animate.css` for animations  

### SECURITY

Many security precautions have been taken:

* **bcryptjs**: For secure password saving in the Database.
* **csurf**: For protection against CSRF attack on Forms and fetch requests.
* **helmet**: For protection against common Security Vulnerabilities inExpress framework.
* **jsonwebtoken(JWT)**: For Secure Email Verification Links.
* **Content Security Policy**: For Secure Content Delivery from the server.
* **limiter**: For Limiting the access to data from a particular client (150 requests per hour).

### AUTHENTICATION

`Passport.js` has been integrated into the application for **Secure Authentication** of User Credentials **over OAuth 2.0** from `Google`, `Facebook`, `GitHub`, `LinkedIn` and `Local Email Verification`.

### MISC

* **connect-mongo** has been used for **storing users** sessions into the database which is important when the application have **multiple instances** running in production
  * Would replace with `connect-redis` for in-memory session storage, better performance.
* **nodemailer** has been used for sending emails(**verification emails**) to the new users.

______

## For Developers

### Config Object

The file `./bin/config/config` exports the config object which is a **cover over the .env file** for better protections and encapsulation (Create a `.env` file first in `bin folder`).
the `./bin/config` directory also have the `development.js`, `production.js` and `testing.js` files for fine tuning the config object in the respective NODE_ENV
for more info open these files and go through the comments.

### Express Security

For security **Helmet** is used with its defaults and additionally **Content Security Policy**

* **Helmet** - [npm Doc](https://www.npmjs.com/package/helmet)
* **Content Security Policy** - [Helmet Doc](https://helmetjs.github.io/docs/csp/)

Additionally other mechanisms are also used:-

* **csurf** - CSRF protection is applied to the entire project. If CSRF is to be enabled only on some routes then go to `./middlewares/security/globalSecurity.js` and disable it and import `./middlewares/security/csurfSetup.js` to the file where it is required. for more details refer [csurf](https://www.npmjs.com/package/csurf).
* **limiter** - to block a user from accessing a route more than a given no. of time in a set duration(eg 150 requests per hour). For more details refer [limiter](https://www.npmjs.com/package/limiter). How to use:-
  * require the limiterSetup file: `./middlewares/security/limiterSetup.js`
  * this will return an express middleware which can be used on any route, router or on app.

### Response Compression

The response object is gzip compressed using [compression](https://www.npmjs.com/package/compression). To request for an uncompressed response use **x-no-compression** in the request header.

### NPM Commands

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

### To-Do

* Use cookies securely
* Add proper Logging ([Bunyan](https://github.com/trentm/node-bunyan) or [Winston](https://github.com/winstonjs/winston))
* Use CORS according to your project.
  * CORS allows other servers and domains to access/request your content. It is **restricted by default**
  * A possible use case could a public API project which is used by others to use your content.
  * you could use [cors](https://www.npmjs.com/package/cors) library to implement it.

<p align="center">
  <img alt="kitten" src="https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif">
</p>
