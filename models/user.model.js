//importaion des dépendances
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//le modéle User
const userSchema = mongoose.Schema({
  pseudo: { type: String, required: true, trimp: true, unique: true },

  email: { type: String, required: true, lowercase: true, trimp: true, unique: true },

  password: { type: String, required: true, max: 1024, min: 1 },

  picture:  { type: String, default: "./uploads/profil/random-user.png" },

  bio: { type: String, max: 1024 },
  
  likes: { type: [String] }

  },

  { timestamps: true }
);

//plugin pour les mots de pass
userSchema.plugin(uniqueValidator);

//exportaion du module
module.exports = mongoose.model('User', userSchema);