// Importa il modulo mysql2, che permette di connettersi a un database MySQL
const mysql = require('mysql2');
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env

// Crea una connessione al database con i parametri necessari
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Host del database MySQL
    port: process.env.DB_PORT, // Porta su cui MySQL è in ascolto (3306 è quella predefinita)
    user: process.env.DB_USERNAME, // Nome utente MySQL
    password: process.env.DB_PASSWORD, // Password dell'utente MySQL
    database: process.env.DB_NAME // Nome del database da usare
});

// Connette al database e gestisce eventuali errori
connection.connect((err) => {
    if (err) {
        console.error("Errore di connessione a MySQL:", err.message);
    } else {
        console.log("Connessione a MySQL riuscita!");
    }
});

// Esporta la connessione per poterla usare in altri file
module.exports = connection;
