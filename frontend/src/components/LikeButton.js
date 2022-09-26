import React, { useState } from "react";
//import { UserContext } from "../AppContext";
import axios from "axios";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const token =  localStorage.getItem( 'token' );
    //const uid = useContext(UserContext)
    

    const like = () => {
        
        const data = {
            id : localStorage.getItem('userId')
            
        };
      
        axios
        .patch(`${process.env.REACT_APP_API_URL}api/post/like/${post._id}`, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res) setLiked(true);
        })

        
    };

    const unlike = () => {
        const data = {
            id : localStorage.getItem('userId'),
            postId: post._id,
        };
      
        axios
        .patch(`${process.env.REACT_APP_API_URL}api/post/unlike/${post._id}`, data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => { 
            if (res) setLiked(false);
        })
    };
    
     
    


    

    return (
        <div>
            {liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {liked && (
                <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
        )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;