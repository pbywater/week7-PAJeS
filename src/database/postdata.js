const db_connection = require('../../database/db_connection.js');

const postData = {};

// TODO Change the last value from 4 to a variable that references username
postData.insertIntoDatabase = (reqPayload, callback) => {
  const query = `INSERT INTO blogposts ( title,body,username)
    VALUES ('${reqPayload.title}','${reqPayload.content}',4)
  ;`;
  db_connection.query(query, (err, dbResponse) => {
    if (err) {
      return callback(err);
    }
    callback(null, dbResponse);
  });
};

module.exports = postData;
