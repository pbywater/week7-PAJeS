const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const data = require('./database/getdata.js');
const CookieAuth = require('hapi-auth-cookie');
const credentials = require('hapi-context-credentials');
const postData = require('./database/postdata.js');

const server = new hapi.Server();

const port = +process.env.PORT || 3005;

const response = {};

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
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      data.getBlogPosts((dbErr, res) => {
        if (dbErr) {
          reply.view('Sorry, We are currently experiencing server difficulties');
          return;
        }
        response.res = res;
        reply.view('index', response);
      });
    },
  });


  server.route({
    method: 'GET',
    path: '/write-post',
    handler: {
      view: 'write-post',
    },
  });

  server.route({
    method: 'POST',
    path: '/logged-in',
    handler: (req, reply) => {
      const { username, password } = req.payload;
      req.cookieAuth.set({ username });
      data.getUsers(username, password, (err, res) => {
        if (err) reply.view('Please enter valid logins');
        if (res.length) {
          data.getBlogPosts((err, res) => {
            if (err) reply.view('Sorry, We are currently experiencing server difficulties');
            response.res = res;
            response.credentials = req.auth.credentials;
            console.log(response.credentials);
            reply.view('index', response);
          });
        } else {
          // reply.view('invalid-login');
        }
      });
    },

  });

  server.route({
    method: 'POST',
    path: '/submit-post',
    handler: (request, reply) => {
      postData.insertIntoDatabase(request.payload, (dbError, res) => {
        if (dbError) {
          // Figure out how to send message with redirect
          // return reply({
          //   message: 'Ayúdame, oh Dios mío, ¿por qué?'
          // }).redirect('write-post');
          return reply.view('write-post', {
            message: 'Ayúdame, oh Dios mío, ¿por qué?',
          });
        }
        reply(res).redirect('/');
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
