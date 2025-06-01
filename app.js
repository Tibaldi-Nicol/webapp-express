const express = require('express');
const app = express();
const port = 3000;

// Import router films
const filmsRouter = require('./routers/films');

// Middleware per parsing JSON (per API)
app.use(express.json());

// Usa router /films
app.use('/films', filmsRouter);

// Middleware per rotte non trovate
app.use((req, res, next) => {
  res.status(404).json({ error: 'Risorsa non trovata' });
});

// Middleware gestione errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Errore interno del server' });
});

// Avvia server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
