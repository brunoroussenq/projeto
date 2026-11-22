require('dotenv').config();
const mysql = require('mysql2');

 
 
 
const sslConfig = process.env.DB_SSL === 'true' 
  ? { rejectUnauthorized: false } 
  : undefined;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

 
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro crítico ao conectar ao MySQL:', err.code, err.message);
  } else {
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
  }
});

 
module.exports = pool.promise();
