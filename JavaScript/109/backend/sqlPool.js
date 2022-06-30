const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: 'chat_app',
});

module.exports = pool;