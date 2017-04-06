const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const CookieAuth = require('hapi-auth-cookie');
const credentials = require('hapi-context-credentials');
const routes = require('./routes/index.js');

const server = new hapi.Server();

const port = +process.env.PORT || 3005;

server.connection({
  port,
});

server.register([inert, vision, CookieAuth, credentials], (err) => {
  if (err) throw err;

  server.views({
    engines: { hbs: handlebars },
    path: 'views',
    layout: 'default',
    layoutPath: 'views/layout',
    partialsPath: 'views/partials',
    helpersPath: 'views/helpers',
  });


  server.route(routes);


  const options = {
    password: 'datagangrulesokdatagangrulesokdatagangrulesok',
    cookie: 'pajescookie',
    isSecure: false,
    ttl: 3 * 60 * 10000,
  };

  server.auth.strategy('base', 'cookie', 'optional', options);
});
// Start server

server.start((err) => {
  if (err) throw err;
  console.log(`Server is running on ${server.info.uri}`);
});
