import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink } from 'react-router-dom';
import UserPicture from './UserPicture';

const UserInfo = () => {

    const [user, setUser] = useState("");
    const avatar = user.picture;
    const userId = localStorage.getItem('userId');
    const token =  localStorage.getItem( 'token' );
    
    
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
    });

    return (
        <div className="user-info">
            <UserPicture avatar={ avatar } />
            <h2>{user.pseudo}</h2>
             <div className="my-bio">
                 <h4>Ma Bio : </h4>
                <p>{user.bio}</p>
            </div>
            <NavLink to='/profil' exact activeClassName="active-link">
                <button type='submit' className='profil-btn'>Profil</button>           
            </NavLink>
        </div>
    );
};

export default UserInfo;