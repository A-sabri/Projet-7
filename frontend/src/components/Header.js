import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';


const Header = () => {
    return (
        <nav>
            <div className="header-container">
                <div className="logo">
                    <NavLink to="/home">
                        <Logo />
                        
                    </NavLink>
                </div>
                <div className='menu'>
                    <Navigation />
                    
                </div>
            </div>
        </nav>
    );
};

export default Header;