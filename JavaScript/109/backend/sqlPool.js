const mysql = require('mysql2/promise');
const sqlInfo = require('./sqlInfo.secret.js');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: sqlInfo.user,
  password: sqlInfo.password,
  database: 'nodeUser',
});

module.exports = pool;