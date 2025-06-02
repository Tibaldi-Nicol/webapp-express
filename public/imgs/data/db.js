// Importa il modulo mysql2, che permette di connettersi a un database MySQL
const mysql = require('mysql2');

// Crea una connessione al database con i parametri necessari
const connection = mysql.createConnection({
    host: "localhost", // Cambiare con l'host corretto (es. "127.0.0.1" per locale)
    port: 3306,        // Porta su cui MySQL è in ascolto (3306 è quella predefinita)
    user: "root",      // Nome utente MySQL
    password: "your_password", // Password dell'utente MySQL
    database: "your_database"   // Nome del database da usare
});

// Connette al database e gestisce eventuali errori
connection.connect((err) => {
    if (err) {
        console.log("Errore di connessione a MySQL: " + err.message);
    } else {
        console.log("Connessione a MySQL riuscita!");
    }
});

//esporto

module.exports= connection
