import React from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';


const Logout = () => {
    const navigate  = useNavigate() ;


    const handleLogOut = () => {

        window.localStorage.clear();
        return navigate('/');
    }

    return (
        <div onClick={handleLogOut}> 
            <img src="/img/icons/logout.svg" alt="logout" />
        </div>
    );
};

export default Logout;