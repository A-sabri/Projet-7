import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from './Button';
import UserPicture from './UserPicture';
import  {dateParser, timestampParser }  from './Date';
import LikeButton from './LikeButton';

const Post = ({ post }) => {
    const [user, setUser] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [editDeletBtn, setEditDeletBtn] = useState(false);
    const [update, setUpdate] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [text, setText] = useState("");
    const avatar = user.picture;
    const userId = localStorage.getItem('userId');
    const token =  localStorage.getItem( 'token' );
    
    // On recupére les donnée utilisateur
    useEffect(() => {
        const userData = async () => {
            axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${post.posterId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
        };
        const getCurrentUser = async () => {
            axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log('res.data',res.data) ;
                setCurrentUser(res.data);
            })
            .catch((err) => console.log(err));
        };
        userData();   
        getCurrentUser() ;    
    },[token, post.posterId]);

    // On affiche les bouton (modifier/suprimmer) sur les post de l'utilisateur
    useEffect(() => {
        if( userId === post.posterId) setEditDeletBtn(true);   
    },[userId, post.posterId]);
    

    
    // On modifie un post
    const updateItem = async (e) => {
        const data = new FormData();
        data.append('message', textUpdate);
        data.append("postId", post._id);
        
        const updatePost = async () => {
            axios
            .put(`${process.env.REACT_APP_API_URL}api/post/${post._id}`, data, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                window.location.reload();          
            })
            .catch((err) => console.log(err));
        };
        updatePost();
    }


    // On supprimer un post
    const deletItem = async (e) => {

        const deletePost = async () => {
            axios
            .delete(`${process.env.REACT_APP_API_URL}api/post/${post._id}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert("post suprimer");
                window.location.reload();          
            })
            .catch((err) => console.log(err));
        };
        deletePost();
    }


    // on ajoute un commentaire
    const handleComment = async (e) => {
        e.preventDefault();
        const data = {
            commenterId: user._id,
            commenterPseudo: user.pseudo,
            text: text
        }
        
        const creatComment = async () => {
            axios
            .patch(`${process.env.REACT_APP_API_URL}api/post/comment/${post._id}`, data, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                window.location.reload();             
            })
            .catch((err) => console.log(err));
        };
        creatComment();
    }


    return (
       
        <div className="post">

            <div className="header-post">
                <div className="header-post-left">
                    <UserPicture avatar={ avatar } />                      
                </div>

                <div className="header-post-center">
                    <div className="date">
                        <h3>{user.pseudo}</h3>
                        <h1></h1>
                        <span>{dateParser(post.createdAt)}</span>
                    </div>
                </div>
                    {editDeletBtn || currentUser.isAdmin &&
                        <div className="edit-post"> 
                            <button className="edit-post-btn"><img src="/img/icons/edit.svg" alt="" onClick={() => setUpdate(!update)}/></button> 
                            <button className="delet-post-btn"><img src="./img/icons/trash.svg" alt=""  onClick={() => deletItem()}/></button>
                        </div>      
                    }   
                
            </div>
       
           <div className="message-post">
           {update === false && <p>{post.message}</p>}
           {update && (
              <div className="update-post">
                    <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                    value={textUpdate}
                    />               
              </div>
            )}
           
            {update && (
                <button className="button center-self" onClick={updateItem} >
                    Edite 
                </button>       
            )}   
            </div>

            <div className="image-post">
                <img src={post.picture} alt="" />
            </div>



            <div className="like-comment-btn">
                <LikeButton post={ post }/>
                
                <button>
                    <img src="/img/icons/message2.svg" alt="comments" />
                </button>
            </div>

            <div className="comment-post">

                    {post.comments.map((comment) => {
                        return  <div className="comment-card">
                                    <img src={comment.commenterPic} alt="" />
                                    
                                    <div className="comente">
                                        <h5>{comment.commenterPseudo}</h5>
                                        <span>{timestampParser(comment.timestamp)}</span>
                                        <p>{comment.text}</p>
                                    </div>
                                    
                                    
                                
                                </div>
                    })}
            </div>


            <div className="user-comment">
                <form action="" onSubmit={handleComment} className="comment-form">
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="écrire un commentaire ..."
                />
                <br />
                <Button type="submit" value="Envoyer"/>
                </form>
            </div>
        </div>
  
    );
};

export default Post;