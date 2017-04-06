const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const data = require('./database/getdata.js');
const postData = require('./database/postdata.js');

const server = new hapi.Server();

const port = +process.env.PORT || 3005;

server.connection({
  port,
});

server.register([inert, vision], (err) => {
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
      data.getBlogPosts((dbError, res) => {
        if (dbError) {
          reply.view('Sorry, We are currently experiencing server difficulties');
          return;
        }
        reply.view('index', { res: res });
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

server.start((err) => {
  if (err) throw err;
  console.log(`Server is running on ${server.info.uri}`);
});
