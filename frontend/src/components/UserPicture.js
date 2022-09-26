import React from 'react';

const UserPicture = ({avatar}) => {
    return (
        <div className='photo-profil'>
            <img src= {avatar} alt="profil" />
        </div>
    );
};

export default UserPicture;