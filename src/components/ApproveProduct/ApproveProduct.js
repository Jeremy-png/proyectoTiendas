import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useContext } from 'react';
import { MenuItem, Select } from '@mui/material';

import { MultiSelect } from "react-multi-select-component";
import { LoginContext } from '../../context/contexto';

import emailjs from '@emailjs/browser';


export default function AprobarProductos() {

  const{
    username, setUsername, setTipoUsuario, tipoUsuario
} = useContext(LoginContext);




 const [idC, setIdC] = React.useState('');
 const [usuarioR, setUsuarioR] = React.useState('');
 const [em, setEm] = React.useState('');
 const [motivo, setMotivo] = React.useState('');
 const [openN, setOpenN] = React.useState(false);

  const [row, setRows]=useState([]);

  const rechazar = (tienda, id) => {
   setOpenN(true);
   setIdC(id);
   //setUsuarioR(usuario);

   axios.get("http://localhost/proyectoTiendas/getUser.php?id="+tienda)
   .then(response=>{
    setUsuarioR(response.data.id_usuario);
    axios.get("http://localhost/proyectoTiendas/getEmail.php?id="+response.data.id_usuario)
      .then(response2=>{
        console.log(response2.data);
        setEm(response2.data.correo);
        
      }).catch(error=>{
        console.log(error);
      });
     
   }).catch(error=>{
     console.log(error);
   });

   

 };

 const handleCloseN = () => {
   setOpenN(false);

 };
 

 const aceptarRechazo = (usuario, id_tienda) => {
   setOpenN(false);

   emailjs.send("service_anoqq7g","template_c17c7a8",{
    to_name: "Usuario: "+usuarioR,
    message: "Le informamos que los cambios realizados a su producto fueron rechazados, por el siguiente motivo: "+ motivo,
    to_email: em,
    reply_to: "caceres191453@unis.edu.gt",
  },"NZQzHmJIncXZui78F");

   const datos = {
     "usuario": usuarioR,
     "empleado": localStorage.getItem("id_usuario"),
     "razon": motivo,
     "contenido": 'p',
     "id": idC
   };
   console.log(datos);

   axios.post('http://localhost/proyectoTiendas/nuevoRechazo.php',datos).then(response => console.log(response));

 };





  

  const aprobar = (usuario, tienda) => {
    console.log(usuario);
    localStorage.setItem('usuario', usuario);

    axios.get("http://localhost/proyectoTiendas/getUser.php?id="+tienda)
   .then(response=>{
    setUsuarioR(response.data.id_usuario);
    axios.get("http://localhost/proyectoTiendas/getEmail.php?id="+response.data.id_usuario)
      .then(response2=>{
        console.log(response2.data);
        setEm(response2.data.correo);

        emailjs.send("service_anoqq7g","template_c17c7a8",{
          to_name: "Usuario: "+usuarioR,
          message: "Le informamos que los cambios realizados a su producto fueron aprobados",
          to_email: response2.data.correo,
          reply_to: "caceres191453@unis.edu.gt",
        },"NZQzHmJIncXZui78F");
        
      }).catch(error=>{
        console.log(error);
      });
     
   }).catch(error=>{
     console.log(error);
   });

    const datos = {
        "id": usuario
      };
      console.log(datos);
      
    
    axios.post('http://localhost/proyectoTiendas/aprobarProducto.php', datos).then(response => console.log(response));


  }




  React.useEffect(() => {

      axios.get("http://localhost/proyectoTiendas/getProductosPendientes.php")
      .then(response=>{
        console.log(response.data);
        setRows(response.data);
        
      }).catch(error=>{
        console.log(error);
      });

    

    }, []);

  return (
    <TableContainer component={Paper}>
        <h2>Productos por Aprobar</h2> 
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="right">Categorias</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((ro) => (
            <TableRow
              key={ro.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <Dialog
            open={openN}
            onClose={handleCloseN}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <Box component="form" noValidate  sx={{ mt: 3 }}>
        <DialogTitle id="alert-dialog-title">
          {"Rechazar Comentario"}
        </DialogTitle>
        
        <DialogContent>
            <h4>ID: {idC}</h4>
            <h4>Email: {em}</h4>
            <h4>Razón del rechazo: </h4>
            <TextField id="outlined-basic" variant="outlined" name="razon" onChange={e=>setMotivo(e.target.value)}/> <br/>
            </DialogContent>
            <DialogActions>
                <Button onClick={e=>aceptarRechazo(ro.id_usuario, ro.id)} > Rechazar</Button>
                <Button onClick={handleCloseN}>Cerrar</Button>
            </DialogActions>
            </Box>
        </Dialog>
              <TableCell component="th" scope="row">
                {ro.id}
              </TableCell>
              <TableCell align="right">{ro.nombre}</TableCell>
              <TableCell align="right">{ro.precio}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
              <TableCell align="right">{ro.categorias}</TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>aprobar(ro.id, ro.id_tienda)}>Aprobar Cambios</Button> </TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>rechazar(ro.id_tienda, ro.id)}>Rechazar Cambios</Button> </TableCell>
            </TableRow>
            
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}