const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

exports.getAllUsers = (req, res, next) => {
    
    UserModel.find().select('-password')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}


exports.userInfo = (req, res, next) => {
    const userId = req.params.id;
    //console.log(req.params);

    if (!ObjectID.isValid(userId)) {
        return res.status(401).json({ message: 'Id unknown : ' + userId});
    } 

    UserModel.findById(userId, (err, docs) =>{
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password')
    
};

exports.updateUser = (req, res, next) => {
    const userId = req.params.id;
    if (!ObjectID.isValid(userId)) {
        return res.status(401).json({ message: 'Id unknown : ' + userId});
    } 

    try {
        
     console.log("voici : " , req.body);
        //modifier la bio
        UserModel.findOneAndUpdate(
            {_id: userId},
            {$set: {bio: req.body.bio,pseudo: req.body.pseudo, picture: "//test/image" }},
            //{$set: {pseudo: req.body.pseudo}},
            //{$set: {picture: "//test/image"}},
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) return res.send(docs);
                if(err) return res.status(500).send({message: err});
            }
        )
    }catch (err) {return res.status(500).json({message: err})}
    
};

exports.deletUser = (req, res, next) => {
    const userId = req.params.id;
    if (!ObjectID.isValid(userId)) {
        return res.status(401).json({ message: 'Id unknown : ' + userId});
    } 

    try {
        UserModel.remove({_id: userId}).exec();
        res.status(200).json({ message: 'Successfully deleted'});

    }catch (err) {return res.status(500).json({message: err})}
    
};




