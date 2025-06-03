// Importa il modulo Express
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

console.log(`🚀 Server avviato sulla porta ${port}`);

// Import middleware e router
const setImagePath = require('./middlewares/setImagePath');
const movieRouter = require('./routers/filmRouter');
const errorHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

// ✅ MIDDLEWARE NELL'ORDINE CORRETTO
console.log('📝 Configurazione middleware...');

// File statici
app.use(express.static('public'));
console.log('✅ Static files middleware configurato');

// JSON parsing
app.use(express.json());
console.log('✅ JSON middleware configurato');

// Image path middleware
app.use(setImagePath);
console.log('✅ Image path middleware configurato');

// ✅ ROTTE DI TEST
app.get('/test', (req, res) => {
  console.log('🧪 Rotta /test chiamata');
  res.json({ message: '✅ Il server risponde correttamente!' });
});

app.get('/', (req, res) => {
  console.log('🏠 Rotta homepage chiamata');
  res.send('Hello From Movies server!');
});

// ✅ ROUTER PRINCIPALE
console.log('🎬 Configurazione router film...');
app.use('/api/films', (req, res, next) => {
  console.log(`🎯 Router film chiamato: ${req.method} ${req.originalUrl}`);
  next();
}, movieRouter);

// ✅ MIDDLEWARE DI GESTIONE ERRORI (SEMPRE ALLA FINE)
app.use(notFound);
app.use(errorHandler);

// Avvio server
app.listen(port, () => {
  console.log(`🌍 Server in ascolto sulla porta ${port}!`);
  console.log(`📋 Rotte disponibili:`);
  console.log(`   GET http://localhost:${port}/`);
  console.log(`   GET http://localhost:${port}/test`);  
  console.log(`   GET http://localhost:${port}/api/films`);
  console.log(`   GET http://localhost:${port}/api/films/:id`);
});