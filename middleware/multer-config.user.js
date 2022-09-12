//importaion des dépendances
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, './client/public/uploads/profil');
  },

  filename: (req, file, callback) => {
    
    const name = req.params.id + ".jpg";

    callback(null, name);
  }
});

//exportaion du module
module.exports = multer({storage: storage}).single('image');