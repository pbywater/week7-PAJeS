const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const data = require('./database/getdata.js');
const CookieAuth = require('hapi-auth-cookie');
const credentials = require('hapi-context-credentials');

const server = new hapi.Server();

const port = +process.env.PORT || 3005;

server.connection({
  port,
});

server.register([inert, vision, CookieAuth], (err) => {
  if (err) throw err;

  server.views({
    engines: { hbs: handlebars },
    path: 'views',
    layout: 'default',
    layoutPath: 'views/layout',
    partialsPath: 'views/partials',
    helpersPath: 'views/helpers',
  });

 // Template routes

  const getBlogs =
    data.getBlogPosts((err, res) => {
      if (err) reply.view('Sorry, We are currently experiencing server difficulties');
      return { res };
    });


  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      console.log(getBlogs);
      reply.view('index', getBlogs);
    },
  });


  server.route({
    method: 'GET',
    path: '/write-post',
    handler: (request, reply) => {
      reply.view('write-post');
    },

  });

  server.route({
    method: 'POST',
    path: '/',
    handler: (req, reply) => {
      const username = req.payload.username;
      const password = req.payload.password;
      req.cookieAuth.set({ username });
      data.getUsers(username, password, (err, res) => {
        if (err) reply.view('Please enter valid logins');
        if (res.length) {
          console.log(req.auth.credentials);
          reply.view('index', {
            credentials: req.auth.credentials,
          });
        } else {
          // reply.view('invalid-login');
        }
      });
    },

  });

  // Static routes
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: './public',
      },
    },

  });
});

// Authentication

const options = {
  password: 'datagangrulesokdatagangrulesokdatagangrulesok',
  cookie: 'pajescookie',
  isSecure: false,
  ttl: 3 * 60 * 10000,
};

server.auth.strategy('base', 'cookie', 'optional', options);

// Start server

server.start((err) => {
  if (err) throw err;
  console.log(`Server is running on ${server.info.uri}`);
});
