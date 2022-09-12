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
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfo);
router.put('/:id', multer, userCtrl.updateUser);
router.delete('/:id', userCtrl.deletUser);
router.patch('/follow/:id', userCtrl.follow);
router.patch('/unfollow/:id', userCtrl.unfollow);



//exportaion du module
module.exports = router;

