const src = 'public/src';
const materialize = 'node_modules/materialize-css/dist';
const animate = 'node_modules/animate.css';

module.exports = {
  staticFileGlobs: [
    `${src}/stylesheets/**.css`,
    '/**.html',
    `${src}/images/**.*`,
    `${src}/images/favicon32x32.ico`,
    `${src}/manifest.json`,
    `${src}/images/icons/**.*`,
    `${src}/javascript/**.js`,
    `${animate}/animate.min.css`,
    `${materialize}/css/materialize.min.css`,
    `${materialize}/js/materialize.min.js`,
  ],
  stripPrefixMulti: {
    'public/src/images/favicon32x32.ico': '/',
    'public/src/': '/',
    'node_modules/materialize-css/dist/': '/',
    'node_modules/animate.css/': '/',
  },
  runtimeCaching: [{
    urlPattern: /fonts\.googleapis\.com/,
    handler: 'cacheFirst',
  },
  {
    urlPattern: /use\.fontawesome\.com/,
    handler: 'cacheFirst',
  },
  {
    urlPattern: /fonts\.gstatic\.com/,
    handler: 'cacheFirst',
  },
  {
    urlPattern: /lh6\.googleusercontent\.com/,
    handler: 'networkFirst',
  },
  {
    urlPattern: /media\.licdn\.com/,
    handler: 'networkFirst',
  },
  {
    urlPattern: /\/dashboard/,
    handler: 'networkFirst',
  },
  {
    urlPattern: /platform-lookaside\.fbsbx\.com/,
    handler: 'networkFirst',
  },
  {
    urlPattern: /pbs\.twimg\.com/,
    handler: 'networkFirst',
  },
  {
    urlPattern: /s\.pinimg\.com/,
    handler: 'networkFirst',
  },
  {
    urlPattern: /avatars0\.githubusercontent\.com/,
    handler: 'networkFirst',
  }],
  dynamicUrlToDependencies: {
    '/': ['views/layout.hbs', 'views/index.hbs', 'views/partials/validation.hbs'],
    '/auth/login': ['views/layout.hbs', 'views/login.hbs', 'views/partials/validation.hbs'],
    '/auth/register': ['views/layout.hbs', 'views/register.hbs', 'views/partials/validation.hbs'],
  },
};
