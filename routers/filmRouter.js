const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

console.log('🎬 Router film caricato');

// Rotta per ottenere tutti i film
router.get('/', (req, res, next) => {
  console.log('📋 Rotta GET / del router film chiamata');
  movieController.index(req, res, next);
});

// Rotta per ottenere un film con le recensioni tramite ID
router.get('/:id', (req, res, next) => {
  console.log(`🎯 Rotta GET /:id del router film chiamata con ID: ${req.params.id}`);
  movieController.show(req, res, next);
});

console.log('✅ Router film configurato con rotte:', router.stack.length);

module.exports = router;