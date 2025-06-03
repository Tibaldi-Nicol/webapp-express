// Importa il modulo Express, che permette di gestire le rotte dell'applicazione
const express = require('express');

// Crea un'istanza di Router di Express per definire le rotte in modo modulare
const router = express.Router();

// Importa il controller che gestisce le operazioni sui film
const movieController = require('../controllers/movieControllers');

// Definisce una rotta GET per la homepage dei film, che richiama la funzione `index` nel controller
router.get('/', movieController.index);

// Definisce una rotta GET per ottenere un singolo film tramite il suo ID, con la funzione `show` nel controller
router.get('/:id', movieController.show);

// Esporta il router per poterlo usare in altre parti dell'app
module.exports = router;
