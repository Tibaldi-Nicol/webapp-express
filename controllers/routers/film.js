const express = require('express');
const router = express.Router();

const { index, show } = require('../controllers/filmsController');

router.get('/', index);       // GET /films - lista film
router.get('/:id', show);     // GET /films/:id - dettaglio film + recensioni

module.exports = router;
