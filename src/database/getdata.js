const db_connection = require('../../database/db_connection.js');

const dataFromDatabase = {};

dataFromDatabase.getBlogPosts = (cb) => {
  db_connection.query('SELECT title, body, users.username FROM blogPosts INNER JOIN users ON users.id=blogPosts.username', (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

dataFromDatabase.getUsers = (inputUsername, inputPassword, cb) => {
  const unacceptableInput = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (unacceptableInput.test(inputUsername) 
    || unacceptableInput.test(inputPassword)){
    return cb(Error('Introduzca un nombre de usuario y una contraseña válidos'));
  }
  db_connection.query(`SELECT * FROM users WHERE username = '${inputUsername}' AND password = '${inputPassword}'`, (err, res) => {
    if (err){
      return cb(err);
    } else if (res.rows.length === 0) {
     return cb(Error('Ese nombre de usuario y contraseña no existen'));
    }
    cb(null, res.rows);
  });
};

module.exports = dataFromDatabase;
