import React from 'react';
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";

import SignUp from "./components/SignUp";
import Connexion from "./pages/Connexion";
import Home from "./pages/Home";
import Profil from "./pages/Profil";



const App = () => {
  let isAuth = localStorage.getItem("token") ;
  console.log('isAuth',isAuth)
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion/>} />
        <Route path="*" element={<Connexion/>} />
       
        
        <Route
          path="/profil"
          element={
            //empêche la navigation si pas authentifié
              !isAuth ? <Navigate to={"/"} />  :<Profil />
          }
        />
        <Route path="/register" element={<SignUp/>} />
        <Route
          path="/home"
          element={
            //empêche la navigation si pas authentifié
              !isAuth ? <Navigate to={"/"} />  :<Home />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
