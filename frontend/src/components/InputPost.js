import React, { useState, useEffect } from 'react';
import axios from "axios";



const InputPost = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState('null');
    const [user, setUser] = useState("");
    const userId = localStorage.getItem( 'userId' );
    const token =  localStorage.getItem( 'token' );

    // On recupére les donnée utilisateur
    useEffect(() => {
        const userData = async () => {
            axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
        };
        userData();       
    },[token, userId]);

    // on crée un post
    const handlePost = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('posterId', user._id);
        data.append('message', message);
        if (file !== null) data.append("image", file);

        
        const creatPost = async () => {
            axios
            .post(`${process.env.REACT_APP_API_URL}api/post/`, data, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
    
                window.location.reload();             
    
            })
            .catch((err) => console.log(err));
        };
        creatPost();
    }

    const handlePicture = async (e) => {
        //e.preventDefault();
        const data = new FormData();
        data.append('posterId', user._id);
        if (file) data.append("image", file);

        const uploadImg = async () => {
            axios
            .post(`${process.env.REACT_APP_API_URL}/uploads`, data, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })

        }
        uploadImg();
    };
    

    return (
        <div className="input-post">
            <div className="header-post">
                <div className="header-post-left">
                    <div className='photo-profil'>
                        <img src={user.picture} alt="" />
                    </div>
                    <h3>{user.pseudo}</h3>
                </div>
            </div>

            <textarea
            type="text" 
            name="message" 
            id="message" 
            placeholder="Ecrire un post ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            />

            <form action="/uploads"  method='POST' onSubmit={handlePicture} className="upload-pic">
                <label htmlFor="file">Ajouter une image : </label>  
                <br />
                <input
                type="file"
                id="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
                //value={file}
                />
            </form>

                <button type="submit" className="button" onClick={handlePost}>
                    Envoyer
                </button>

        </div>
    );
};

export default InputPost;