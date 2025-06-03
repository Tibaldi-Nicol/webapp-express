// Importa il modulo Express, una libreria per creare server web in Node.js
const express = require('express');
//importo dotenv
//const dotenv=require('dotenv')

//utilizziamo la variabile dotenv richiamando il suo metodo config()
//dotenv.config()

// Crea un'istanza dell'applicazione Express
const app = express();

// Definisce la porta su cui il server sarà in ascolto
console.log()
const port = process.env.SERVER_PORT ||3000  ;

// Configura Express per servire file statici dalla cartella "public".
// Questo permette di caricare risorse come immagini, CSS e JavaScript senza dover definire route specifiche.
app.use(express.static('public'));

// Configura Express per analizzare automaticamente i JSON nelle richieste HTTP.
// Questo consente al server di gestire facilmente i dati inviati in formato JSON.
app.use(express.json());

// Configura una route GET per la homepage ('/') che risponde con "Hello From Movies server!"
app.get('/', (req, res) => res.send('Hello From Movies server!'));

// Avvia il server e lo mette in ascolto sulla porta specificata
app.listen(port, () => console.log(`app listening on port ${port}!`));


//passaggi standard ripetuti  