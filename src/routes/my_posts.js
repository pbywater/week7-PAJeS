const data = require('../database/getdata.js');


module.exports={
  method: 'GET',
  path:'/my-posts',
  handler:(req, reply)=>{
    console.log(req.auth.credentials.username);
    data.getBlogPostsByUser(req.auth.credentials.username, (dbErr, res) => {
      if (dbErr) {
        reply.view('Sorry, We are currently experiencing server difficulties');
        return;
      }
      reply.view('index', { res });
    });
  },
}
