const db_connection = require('../../database/db_connection.js');

const dataFromDatabase = {};

dataFromDatabase.getBlogPosts = (cb) => {
  db_connection.query('SELECT title, body, users.username FROM blogPosts INNER JOIN users ON users.id=blogPosts.username', (err, res) => {
    if (err) cb(err);
    cb(null, res.rows);
  });
};

dataFromDatabase.getUsers = (inputUsername, inputPassword, cb) => {
  db_connection.query(`SELECT * FROM users WHERE username = '${inputUsername}' AND password = '${inputPassword}'`, (err, res) => {
    if (err) cb(err);
    cb(null, res.rows);
  });
};

module.exports = dataFromDatabase;
