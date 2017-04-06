const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const data = require('./database/getdata.js');
const CookieAuth = require('hapi-auth-cookie');
const credentials = require('hapi-context-credentials');
const postData = require('./database/postdata.js');

const server = new hapi.Server();
// let cache;

const port = process.env.PORT || 3005;

server.connection({
  port,
});

server.register([inert, credentials, vision, CookieAuth], (err) => {
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
        // cache = res;
        reply.view('index', { res });
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
      data.getUsers(username, password, (err, res) => {
        if (err) {
          //TODO res: cache, can be passed in but makes the above function run since
          //its our only means of validation
          reply.view('index', { message: err.message });
        }
        else if (res.length) {
          data.getBlogPosts((dbError, allTheBlogsPosts) => {

            if (dbError) {
              reply.view('Sorry, We are currently experiencing server difficulties');
            }
            req.cookieAuth.set({ username });
            console.log('credentials', credentials);
            reply({ res: allTheBlogsPosts }).redirect('/');

          });
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
          //  TODO Figure out how to send message with redirect
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
