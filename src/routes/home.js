const data = require('../database/getdata.js');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    data.getBlogPosts((dbErr, res) => {
      if (dbErr) {
        reply.view('Sorry, We are currently experiencing server difficulties');
        return;
      }
      reply.view('index', { res });
    });
  },
};
