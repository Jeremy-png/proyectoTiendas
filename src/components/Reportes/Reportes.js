import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { MultiSelect } from "react-multi-select-component";
import Usuarios from './Usuarios';
import ReportesProductos from './Productos';
import ReportesTiendas from './Tiendas';
import ComentariosTiendas from './ComentariosTiendas';
import ComentariosProductos from './ComentariosProductos';
import ComentariosUsuarios from './ComentariosUsuarios';
import ReportesRechazos from './Rechazos';



export default function Reportes() {
  



  React.useEffect(() => {
    
    
      //console.log("Tienda: "+tienda.id);

    }, []);


  

  return (
    <div>
       <h1>Reportes</h1>
        <Usuarios/>
        <ReportesProductos/>
        <ReportesTiendas/>
        <ComentariosTiendas/>
        <ComentariosProductos/>
        <ComentariosUsuarios/>
        <ReportesRechazos/>
    </div>
  );
}