import React, { useState, useContext } from "react";
import { UserContext } from "../AppContext";
import axios from "axios";

const UploadImagePost = () => {
    const [file, setFile] = useState();
    const user = useContext(UserContext);
    const token =  localStorage.getItem( 'token' );

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", user.pseudo);
        data.append("userId", user._id);
        data.append("file", file);
        
        axios
        .post(`${process.env.REACT_APP_API_URL}/uploads`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
      };


    return (
      <form action="" onSubmit={handlePicture} className="upload-pic">
        <label htmlFor="file">Ajouter une image : </label>  
        <br />
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </form>
    );
};

export default UploadImagePost;