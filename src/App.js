import React from 'react';
import AppRouter from './routers/AppRouter';
import {useContext, useState, useEffect} from 'react';
import { LoginContext } from './context/contexto';
import Header from './components/Header/Header';
function App() {

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
      </div>


  );
}

export default App;
