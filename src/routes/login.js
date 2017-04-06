const data = require('../database/getdata.js');


module.exports = {
  method: 'POST',
  path: '/',
  handler: (req, reply) => {
    const { username, password } = req.payload;
    data.getUsers(username, password, (err, res) => {
      if (err) reply.view('Please enter valid logins');
      if (res.length) {
        req.cookieAuth.clear();
        req.cookieAuth.set({ username });
        reply.redirect('/');
      } else {
        req.cookieAuth.set({ fail: 'Please enter a valid login!' });
        reply.redirect('/');
      }
    });
  },
};
