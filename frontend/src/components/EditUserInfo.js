import React from 'react';
import UserPicture from './UserPicture';

const EditUserInfo = () => {
    return (
        <div className="edit-user-info">
            <div className="my-picture">
            <UserPicture />
            <li>modifier image</li>
            </div>

            
            <div className="my-name">
                <label htmlFor="name">Nom : </label>
                
                <input type="text" />
            </div>

            <div className="my-bio">
                <label htmlFor="bio">Bio : </label>
                <br />
                <p>
                    <input type="text" />
                </p>      
            </div>

            <div class="wrap">
            
                <button class="button">
                    Valider Profile
                 </button>
            
            </div>

        </div>
    );
};

export default EditUserInfo;