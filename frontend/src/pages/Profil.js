import React from 'react';
import { useNavigate } from 'react-router-dom';
//import EditUserInfo from '../components/EditUserInfo';
import Header from '../components/Header';
import UserPicture from '../components/UserPicture';

const Profil = () => {
    const token =  localStorage.getItem( 'token' );
    const navigate  = useNavigate();

    if (!token) {
        return navigate('/',{replace : true});
    }

    return (
        <div>
            <Header />
            <main>
                <div className="profil-container">
                    <div className="user-info">
                        <UserPicture />
                        <h2>Nom</h2>
                        <div className="my-bio">
                            <h4>Ma Bio : </h4>

                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Officia quos alias quae nobis cupiditate pariatur.
                            </p>
                     
                        </div>
                        <div class="wrap">
            
                            <button class="button">
                                Edit Profile
                            </button>

                            <button class="button red">
                                Delet Account
                            </button>
    
                        </div>
                    </div>

                    

                </div>
            </main>
            
            
        </div>
    );
};

export default Profil;