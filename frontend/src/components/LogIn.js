import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';



const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState('false');
  
  const msgError = document.querySelector(".msg");
  const input = document.querySelector(".input-group");


  const handleLogIn = (e) => {
    e.preventDefault();

    if (user === true){
      return navigate("/home");
    }else{
      msgError.innerHTML = '* identifiant ou mot de passe incorrecte';
      input.classList.add("error");
    }
  }
  
  
  useEffect(() => {
    axios.post(
      `${process.env.REACT_APP_API_URL}api/user/login`, {
      email: email,
      password: password
    })
    .then((res) => {
      setUser(true)
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('userId',res.data.userId);
      
      
    }   )
      
    .catch(err => console.log(err))
  });

  
  


  return (
    <div className='full-screen-container'>
    <div className="login-container">
    <Logo />    
      <h1 className="login-title">Bienvenue</h1>
      <form action ="" className="form"  id="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id='email' onChange={(e) => setEmail(e.target.value) } value={email}/>
          
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id='password' onChange={(e) => setPassword(e.target.value) } value={password} />
        </div>

        <span className="msg"></span>

        <button type='submit' className='login-button' onClick={handleLogIn}>Connexion</button>
      </form>

      <p>
        vous n'avez pas de compte ?<br />
        <span className="line">
            <Link to="/register">Inscrivez vous</Link>
          </span>
      </p>

    </div>           
  </div>
  );

};

export default LogIn;