const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//ajouter photo de profile
exports.uploadProfil = (req, res, next) => {
    
    try {
        
        if (req.file.detectedMimeType !== MIME_TYPES) {
            throw res.status(401).json({message: 'fichier invalide'});
        }
    
        if (req.file.size > 500000) {
            throw res.status(401).json({message: 'fichier trop volumineux'});
        }

    } catch (error) {
        return res.status(400).json({ error });
    }

    const filename = req.body.name.split(' ').join('_') + ".jpg";

    pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../client/public/uploads/profil/${filename}`)
    )
    
    
    
    
}