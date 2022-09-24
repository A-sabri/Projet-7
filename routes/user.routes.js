//importaion des dépendances
const express = require('express');
const router = express.Router();

//importaion des middleware
const auth = require('../middleware/auth.middlware.js');
const multer = require('../middleware/multer-config.user');

//importaion des controller 
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');

//auth
router.post('/register', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout );

//user display
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.userInfo);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deletUser);




//exportaion du module
module.exports = router;

