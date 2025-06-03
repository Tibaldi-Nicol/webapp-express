const connection = require('../data/db');

// Ottiene tutti i film dal DB e aggiunge path immagine
const index = (req, res) => {
  console.log('🎬 Richiesta ricevuta per tutti i film');
  console.log('🖼️ Image path disponibile:', req.setImagePath);
  
  const sql = 'SELECT * FROM movies';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Errore DB:', err);
      return res.status(500).json({ error: 'Errore nel recupero dei film' });
    }
    
    console.log('📊 Risultati dal DB:', results);
    console.log('📝 Numero di film trovati:', results.length);
    
    // Mappa i risultati aggiungendo il percorso completo delle immagini
    const movies = results.map((movie) => {
      return {
        ...movie,
        image: `${req.setImagePath}/${movie.image}`
      }
    });
    
    console.log('✅ Film processati con immagini:', movies);
    
    // ⭐ QUESTO È IL PUNTO CRITICO - INVIA LA RISPOSTA
    console.log('📤 Invio risposta JSON...');
    res.json(movies);
    console.log('✅ Risposta inviata con successo!');
  });
};

// Ottiene un film per ID con le sue recensioni
const show = (req, res) => {
  const { id } = req.params;
  console.log(`🎯 Richiesta per film ID: ${id}`);
  
  const movieSql = 'SELECT * FROM movies WHERE id = ?';
  const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';
  
  connection.query(movieSql, [id], (err, movieResult) => {
    if (err) {
      console.error('❌ Errore nel recupero del film:', err);
      return res.status(500).json({ error: 'Errore nel recupero del film' });
    }
    
    if (movieResult.length === 0) {
      console.log('❌ Film non trovato per ID:', id);
      return res.status(404).json({ error: 'Film non trovato' });
    }
    
    const film = movieResult[0];
    film.image = `${req.setImagePath}/${film.image}`;
    console.log('🎬 Film trovato:', film);
    
    connection.query(reviewsSql, [id], (err, reviewsResult) => {
      if (err) {
        console.error('❌ Errore nel recupero recensioni:', err);
        return res.status(500).json({ error: 'Errore nel recupero recensioni' });
      }
      
      console.log('⭐ Recensioni trovate:', reviewsResult.length);
      film.reviews = reviewsResult;
      
      console.log('📤 Invio risposta film singolo...');
      res.json(film);
      console.log('✅ Risposta film singolo inviata!');
    });
  });
};

module.exports = { index, show };