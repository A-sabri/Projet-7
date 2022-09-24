//importaion des dépendances
const express = require('express');
const router = express.Router();

//importaion des middleware
const auth = require('../middleware/auth.middlware.js');
const multer = require('../middleware/multer-config.post');


//importaion des controller 
const postCtrl = require('../controllers/post.controller.js');


//Post
router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

//like post
router.patch('/like/:id', auth, postCtrl.likePost);
router.patch('/unlike/:id', auth, postCtrl.unlikePost);

//comments post
router.patch('/comment/:id', auth, postCtrl.commentPost);
router.patch('/edit-comment/:id', auth, postCtrl.editCommentPost);
router.patch('/delet-comment/:id', auth, postCtrl.deletCommentPost);







//exportaion du module
module.exports = router;