import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const Navigation = () => {
    return (
        <div className="nav-container">
            
            <div className="link">
                 <NavLink to='/home' exact activeClassName="active-link">
                        <img src="./img/icons/home.svg" alt="home"/>
                 </NavLink>
                <br/>
                <NavLink to='/profil' exact activeClassName="active-link">
                        <img src="./img/icons/user.svg" alt="profil"/>
                </NavLink>
                <br/>
                <Logout />
            </div>
            
        </div>
    );
};

export default Navigation;