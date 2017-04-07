const test = require('tape');
const server = require('../src/server.js');
const data = require('../src/database/getdata.js');


test('Passing test for travis', (t) => {
  t.equal(1, 1, '1 is equal to 1');
  t.end();
});

test('database functions', (t) => {
  data.getBlogPosts((err, res)=>{
    t.ok(res.length>1);
  });
  t.end();
});

test('Check home route', (t)=>{
  var options = {
    method: 'GET',
    url: '/'
  }
  server.inject(options, (res)=>{
    t.equal(res.statusCode, 200, 'Should return statuscode of 200');
    t.equal(res.headers['content-type'], 'text/html; charset=utf-8');
    t.end();
  });
})


// test('Check  /my-posts', (t)=>{
//   var options = {
//     method: 'GET',
//     url: '/my-posts'
//   };
//   server.inject(options, (res)=>{
//     t.equal(res.statusCode, 200, 'Should return statuscode of 200');
//     t.end();
//   });
// });

// test('Check  /submit-post', (t)=>{
//   var options = {
//     method: 'POST',
//     url: '/submit-post'
//   }
//   server.inject(options, (res)=>{
//     t.equal(res.statusCode, 200, 'Should return statuscode of 200');
//     t.end();
//   });
// });

// test('Check  /logged-in', (t)=>{
//   var options = {
//     method: 'POST',
//     url: '/logged-in'
//   }
//   server.inject(options, (res)=>{
//     t.equal(res.statusCode, 200, 'Should return statuscode of 200');
//     t.end();
//   });
// });

test('Check  /write-post', (t)=>{
  var options = {
    method: 'GET',
    url: '/write-post'
  }
  server.inject(options, (res)=>{
    t.equal(res.statusCode, 200, 'Should return statuscode of 200');
    t.equal(res.headers['content-type'], 'text/html; charset=utf-8', 'content-type should equal html');
    t.end();
  });
})
