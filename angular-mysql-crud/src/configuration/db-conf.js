const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'database-libreria.csrrtte37e3f.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin#yt123',
    database: 'libreria',
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('estamos en Linea');    
    }
  });

  module.exports = mysqlConnection;