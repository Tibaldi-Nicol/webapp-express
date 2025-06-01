const db = require('../db');

// Lista film - Milestone index
const index = async (req, res, next) => {
  try {
    const [films] = await db.query('SELECT * FROM films');
    res.json(films);
  } catch (error) {
    next(error);  // passa l'errore al middleware di gestione errori
  }
};

// Dettaglio film + recensioni - Milestone show
const show = async (req, res, next) => {
  try {
    const filmId = req.params.id;

    // Prendi il film
    const [[film]] = await db.query('SELECT * FROM films WHERE id = ?', [filmId]);

    if (!film) {
      return res.status(404).json({ message: 'Film non trovato' });
    }

    // Prendi le recensioni del film
    const [reviews] = await db.query('SELECT * FROM reviews WHERE film_id = ?', [filmId]);

    // Rispondi con film + recensioni
    res.json({ film, reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = { index, show };
