const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');

const server = new hapi.Server();

const port = process.env.PORT || 3005;
const host = process.env.HOST || 'localhost';

server.connection({
  port,
  host,
});

server.start((err) => {
  if (err) throw err;
  console.log(`Server is running on ${server.info.uri}`);
});
