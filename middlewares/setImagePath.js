
// middlewares/setImagePath.js

const setImagePath = (req, res, next) => {
  req.setImagePath = `${req.protocol}://${req.get('host')}/imgs/movies`;
  console.log('🖼️ Middleware setImagePath:', req.setImagePath);
  next();
};

module.exports = setImagePath;