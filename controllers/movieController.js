// Importa la connessione al database
const connection = require('../data/db');

// Funzione per ottenere tutti i film
const index = (req, res) => {
    connection.query("SELECT * FROM MOVIES", (err, result) => {
        if (err) {
            // Gestione errore del database
            return res.status(500).json({ error: "Errore nel recupero dei film" });
        }
        // Invia l'elenco dei film come risposta
        res.json(result);
    });
};

// Funzione per mostrare i dettagli di un singolo film + recensioni
const show = (req, res) => {
    // Recupera l'id del film dalla URL (es: /api/films/2)
    const { id } = req.params;

    // Query per recuperare i dettagli del film specifico
    const movieSql = "SELECT * FROM MOVIES WHERE id = ?";

    // Query per recuperare le recensioni associate a quel film
    const reviewsSql = "SELECT * FROM REVIEWS WHERE movie_id = ?";

    // Esegui la prima query per ottenere il film
    connection.query(movieSql, [id], (err, movieResult) => {
        if (err) {
            return res.status(500).json({ error: "Errore nel recupero del film" });
        }

        if (movieResult.length === 0) {
            // Nessun film trovato con quell'id
            return res.status(404).json({ error: "Film non trovato" });
        }

        // Esegui la seconda query per ottenere le recensioni
        connection.query(reviewsSql, [id], (err, reviewsResult) => {
            if (err) {
                return res.status(500).json({ error: "Errore nel recupero delle recensioni" });
            }

            // Costruisci l'oggetto finale: film + recensioni
            const filmConRecensioni = {
                ...movieResult[0], // info del film
                reviews: reviewsResult // array di recensioni
            };

            // Invia il risultato finale
            res.json(filmConRecensioni);
        });
    });
};

// Esporta le funzioni per usarle nel router
module.exports = {
    index,
    show
};
