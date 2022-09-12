//importaion des dépendances
const express = require('express');
const router = express.Router();

//importaion des middleware
const auth = require('../middleware/auth.middlware.js');
const multer = require('../middleware/multer-config.post');


//importaion des controller 
const postCtrl = require('../controllers/post.controller.js');


//Post
router.get('/', postCtrl.getAllPost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

//like post
router.patch('/like/:id', postCtrl.likePost);
router.patch('/unlike/:id', postCtrl.unlikePost);

//comments post
router.patch('/comment/:id', postCtrl.commentPost);
router.patch('/edit-comment/:id', postCtrl.editCommentPost);
router.patch('/delet-comment/:id', postCtrl.deletCommentPost);



//retourne un objet unique 
//router.get('/:id', auth, postCtrl.getOnePost);



//exportaion du module
module.exports = router;