import React from 'react';
import AppRouter from './routers/AppRouter';
import {useContext, useState, useEffect} from 'react';
import { LoginContext } from './context/contexto';
import Header from './components/Header/Header';
import Comments from "./comments/comments.js";
import './App.css';
import { FaStar } from "react-icons/fa";



const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
    
};

function App() {


  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const getUsername=()=>{
    const localUsername = localStorage.getItem('usuario');
    return localUsername ? JSON.parse(localUsername) : null;
  }

  const getTipoUsuario=()=>{
    const localTipoUsuario = localStorage.getItem('tipoUsuario');
    return localTipoUsuario ? JSON.parse(localTipoUsuario) : 4;
  }


  const[username, setUsername] = useState(getUsername); //useState setea valor inicial, resultado funcion
  const[tipoUsuario, setTipoUsuario]=useState(getTipoUsuario);

  useEffect(()=>{ //usuario y tipo se seteen con lo que esta en el local storage
    localStorage.setItem('usuario', JSON.stringify(username));
    localStorage.setItem('tipoUsuario', JSON.stringify(tipoUsuario));
  })
  

  return (



      <div className="App">

      <LoginContext.Provider value={{username, setUsername, setTipoUsuario, tipoUsuario}}>   
      <Header/>
      <AppRouter />
      </LoginContext.Provider> 
      <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      /> 
      </div>



  );
}


export default App;

