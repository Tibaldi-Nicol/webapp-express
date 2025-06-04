// Middleware per gestire richieste su rotte inesistenti
module.exports = (req, res, next) => {
  res.status(404).json({ error: '🔍 Rotta non trovata' });
};
