const PostModel = require('../models/post.model.js');
const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');


//retourne tout les post 
exports.getAllPost = (req, res, next) => {
    PostModel.find().sort({createdAt: -1})
      .then(post => res.status(200).json(post))
      .catch(error => res.status(400).json({ error }));
}

//enregistrer un post
exports.createPost = (req, res, next) => {
    const postObject =  req.body;
    console.log(postObject);
    const post = new PostModel({
        posterId: postObject.posterId,
        message: postObject.message,
        video: postObject.video,
        picture: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        likers: [],
        comments: [],
    });
  
    post.save()
    .then(() => { res.status(201).json({message: 'Post enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

//modification d'un post
exports.modifyPost = (req, res, next) => {

    const postId = req.params.id;
    const modifyMsg = { message: req.body.message };
    const modifyImg = { picture: req.file.filename };
    console.log(modifyImg);
    
    PostModel.findOne({_id: postId})
        .then((post) => {
            if (!ObjectID.isValid(postId)) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                PostModel.findByIdAndUpdate(
                    postId, 
                    { $set: modifyMsg },
                    { $set: modifyImg },
                    { new: true },
                )
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//suppreimer un post
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;

    PostModel.findOne({ _id: postId})
        .then(post => {
            if (!ObjectID.isValid(postId)) {
                res.status(401).json({message: 'Non-autorisé'});
            } 
            else {
                PostModel.findByIdAndRemove({_id: postId })
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

//liker un poste
exports.likePost = (req, res, next) => {
    const userId = req.body.id;
    const postId = req.params.id

    if (!ObjectID.isValid(postId)) {
        res.status(401).json({message: 'Non-autorisé'});
    } 
    
    try {
        PostModel.findByIdAndUpdate(
            postId , 
            { $addToSet: { likers: userId }},
            { new: true },
        )
        

        UserModel.findByIdAndUpdate(
            userId, 
            { $addToSet: { likes: postId }},
            { new: true },
        )
        .then(() => res.status(200).json({ message: `J'aime le poste` }))
        .catch((error) => res.status(400).json({ error }))

    } catch (error) {
        return res.status(400).json({ error });
    }
};

//unliker un poste
exports.unlikePost = (req, res, next) => {
    const userId = req.body.id;
    const postId = req.params.id

    if (!ObjectID.isValid(postId)) {
        res.status(401).json({message: 'Non-autorisé'});
    } 
     
    try {
        PostModel.findByIdAndUpdate(
            postId , 
            { $pull: { likers: userId }},
            { new: true },  
        );
       

        UserModel.findByIdAndUpdate(
            userId, 
            { $pull: { likes: postId }},
            { new: true },   
        )
        .then(() => res.status(200).json({ message: `J'aime pas le poste` }))
        .catch((error) => res.status(400).json({ error }))
        
    } catch (error) {
        return res.status(400).json({ error });
    }
};

//ajouter un commentaire
exports.commentPost = (req, res, next) => {
    const user = req.body;
    const postId = req.params.id

    if (!ObjectID.isValid(postId)) {
        res.status(401).json({message: 'Non-autorisé'});
    }

    try {
        return PostModel.findByIdAndUpdate(
            postId , 
            { $push: { 
                comments: {
                    commenterId: user.commenterId,
                    commenterPseudo: user.commenterPseudo, 
                    text: user.text, 
                    timestamp: new Date().getTime(),  
                },
            },
            },
            { new: true },
        )
        .then(() => res.status(200).json({ message: `message posté` }))
        .catch((error) => res.status(400).json({ error }))
        
    } catch (error) {
        return res.status(400).json({ error });
    }
  
    




}

//editer un commentaire 
exports.editCommentPost = (req, res, next) => {
    const user = req.body;
    const postId = req.params.id;

    if (!ObjectID.isValid(postId)) {
        res.status(401).json({message: 'Non-autorisé'});
    }
    
    try {
        return PostModel.findById(postId, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(user.commentId)
            )
    
            if(!theComment) return res.status(404).json({message: 'Commentaire introuvable'});
            theComment.text = user.text;
    
            return docs.save((err, docs) => {
                if (!err) return res.status(200).json({ message: `commentaire modifié` })
                return res.status(500).json({ error })
            });  
        }
        );    
    } catch (error) {
        return res.status(400).json({ error });
    }

}

//suprimmer un commentaire 
exports.deletCommentPost = (req, res, next) => {
    const user = req.body;
    const postId = req.params.id

    if (!ObjectID.isValid(postId)) {
        res.status(401).json({message: 'Non-autorisé'});
    }

    try {
        return PostModel.findByIdAndUpdate(
            postId , 
            { $pull: { 
                comments: {
                    _id: user.commentId,  
                }
            }
            },
            { new: true },
        )
        .then(() => res.status(200).json({ message: `message suprimer` }))
        .catch((error) => res.status(400).json({ error }))
        
    } catch (error) {
        return res.status(400).json({ error });
    }
    
}




  
  
