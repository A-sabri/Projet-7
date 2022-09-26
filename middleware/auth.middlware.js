const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
    const { id } = decodedToken;
    req.auth = {
      id,
    };
    next();
  } catch {
    res.status(401).json({ message: `Echec de l'authentification` });
  }
};

module.exports.checkUser = (req, res, next) => {
  
  
};

