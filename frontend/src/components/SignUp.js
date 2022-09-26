import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState('false');

  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  );
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
  
  
  useEffect(() => {
    axios.post(
      `${process.env.REACT_APP_API_URL}api/user/register`, {
        pseudo: name, 
        email: email,
        password: password
      })
      .then(() => {
        setUser(true)
        
      }   )
      
      .catch(err => console.log(err))
  });
  
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validEmail.test(email)) {
      setEmailErr(true);
   }
   if (!validPassword.test(password)) {
      setPwdError(true);
   }

    if (user === true){

      alert("inscription réussi");
      navigate("/");
    }
  }

    
    return (
        <div className='full-screen-container'>
          <div className="login-container">
          <Logo />
            <h1 className="login-title">Inscription</h1>
            <form className="form">

            <div className="input-group">
                <label htmlFor="text">Nom</label>
                <input type="text" name="name" id='name' onChange={(e) => setName(e.target.value) } value={name}/>
                
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id='email' onChange={(e) => setEmail(e.target.value) } value={email}/>
                
                {emailErr && <span className="msg">Valid email</span>}
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id='password' onChange={(e) => setPassword(e.target.value) } value={password}/>
                {pwdError && <span className="msg">Incorect password</span>}
                
              </div>


              <button type='submit' className='login-button' onClick={handleSignUp}>Inscription</button>
            </form>
            <p>
              vous avez deja un compte ?<br />
              <span className="line">
               <Link to="/">connectez vous</Link>
              </span>
            </p>
            
          </div>           
        </div>
    );
};

export default SignUp;