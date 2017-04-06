const db_connection = require('../../database/db_connection.js');

const dataFromDatabase = {};

dataFromDatabase.getBlogPosts = (cb)=>{
  db_connection.query('SELECT title, body, users.username FROM blogPosts INNER JOIN users ON users.id=blogPosts.username', (err, res)=>{
    if(err) cb(err);
    cb(null, res.rows);
  })
}

dataFromDatabase.getUsers = (cb)=>{
  db_connection.query('SELECT username, password FROM users', (err, res)=>{
    if(err) cb(err);
    cb(null, res.rows);
  })
}

module.exports = dataFromDatabase;
