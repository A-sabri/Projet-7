const UserModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//inscription de l'utilisateur 
exports.signup = (req, res, next) => {
  console.log(req.body);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new UserModel({ 
          pseudo: req.body.pseudo, 
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


//conexion au compte de l'utilisateur 
exports.login = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'identifiant ou mot de passe incorrecte'});
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'identifiant ou mot de passe incorrecte' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id },
                          'RANDOM_TOKEN_SECRET',
                          { expiresIn: '24h' }
                      )
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


//se déconecter 
exports.logout = (req, res, next) => {
  
};