const mongoose = require('mongoose');

//le modéle User
const postSchema = mongoose.Schema({
    posterId: { type: String, required: true },

    message: { type: String, trimp: true, maxlenght: 500 },

    picture:  { type: String },

    likers: { type: [String], required: true },

    comments: { 
      type: [
          {
              commenterId: String,
              commenterPseudo: String,
              text: String,
              timestamps: Number,
          }
      ],
      require: true, 
    },
  },

  { timestamps: true }  

);
  
//exportaion du module
module.exports = mongoose.model('Post', postSchema);