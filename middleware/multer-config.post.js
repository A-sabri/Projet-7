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
    callback(null, 'uploads');
  },

  filename: (req, file, callback) => {
    console.log('file----',file.originalname) ;
    const name = file.originalname.split(' ').join('_');

    const extension = MIME_TYPES[file.mimetype];
    
    callback(null, name + Date.now() + '.' + extension);
  }
});

//exportaion du module
module.exports = multer({storage: storage}).single('image');