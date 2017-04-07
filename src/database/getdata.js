const db_connection = require('../../database/db_connection.js');

const dataFromDatabase = {};

dataFromDatabase.getBlogPosts = (cb) => {
  db_connection.query('SELECT title, body, users.username FROM blogPosts INNER JOIN users ON users.id=blogPosts.username', (err, res) => {
    if (err) cb(err);
    cb(null, res.rows);
  });
};

dataFromDatabase.getUsers = (inputUsername, inputPassword, cb) => {
  const unacceptableInput = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (unacceptableInput.test(inputUsername)){
    cb(Error('Please input a a valid username and password'));
  }
  db_connection.query(`SELECT * FROM users WHERE username = '${inputUsername}' AND password = '${inputPassword}'`, (err, res) => {
    if (err){
      cb(err);
    } else if (res.rows.length === 0) {
     cb(Error('This user does not exist')) 
    }
    cb(null, res.rows);
  });
};

module.exports = dataFromDatabase;
