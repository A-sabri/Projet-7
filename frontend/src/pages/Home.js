import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import InputPost from '../components/InputPost';
import Post from '../components/Post';
import UserInfo from '../components/UserInfo';
import axios from "axios";



const Home = () => {

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState(true)
  const token =  localStorage.getItem( 'token' );
  
  
  
  useEffect(() => {
    const getAllPosts = async () => {
      
      axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res) {
          setData(res.data);
          
        } else {
          setDisplayData(false)
        }
      })
      .catch((err) => console.log(err));
      
    };
    getAllPosts();
    
  });

  
 


  return (
        <div>
            <Header />
            <main>
                <div className="home-container">

                  <div className="info-container">
                    <UserInfo />
                  </div>

                  <div className="main-container">
                    
                    <div className="post-container">
                    <InputPost />
                    </div>
                    
                    <div className="post-container">
                      {displayData ? data.map((post) => {
                        return <Post post={post} key={post.id} />;
                      }) : `aucun post disponible`}
                    </div>

                    
                  </div>

                  <div className="trends-container">

                  </div>

                </div>
            </main>
            
            
        </div>
    );
};

export default Home;