// Middleware per gestire errori generici dell'applicazione
module.exports = (err, req, res, next) => {
  console.error('Errore:', err);
  res.status(500).json({ error: '💥 Errore del server' });
};
