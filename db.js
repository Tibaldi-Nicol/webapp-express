// db.js - connessione al database MySQL
const mysql = require('mysql2');

// Configurazione connessione DB
const pool = mysql.createPool({
  host: 'localhost',
  user: 'tuo_utente',
  password: 'tua_password',
  database: 'nome_database_film',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); // esporta la connessione come promise (per async/await)
