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
 
 
 export default function AprobarComentarios() {
 
   const{
     username, setUsername, setTipoUsuario, tipoUsuario
 } = useContext(LoginContext);
 
 
 
 const [idC, setIdC] = React.useState('');
 const [usuarioR, setUsuarioR] = React.useState('');
 const [em, setEm] = React.useState('');
 const [motivo, setMotivo] = React.useState('');
 const [openN, setOpenN] = React.useState(false);

  const [row, setRows]=useState([]);

  const rechazar = (usuario, id) => {
   setOpenN(true);
   setIdC(id);
   setUsuarioR(usuario);

   axios.get("http://localhost/proyectoTiendas/getEmail.php?id="+usuario)
   .then(response=>{
     console.log(response.data);
     setEm(response.data.correo);
     
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
    message: "Le informamos que su comentario fue rechazado, por el siguiente motivo: "+ motivo,
    to_email: em,
    reply_to: "caceres191453@unis.edu.gt",
  },"NZQzHmJIncXZui78F");

   const datos = {
     "usuario": usuarioR,
     "empleado": localStorage.getItem("id_usuario"),
     "razon": motivo,
     "contenido": 'c',
     "id": idC
   };
   console.log(datos);

   axios.post('http://localhost/proyectoTiendas/nuevoRechazo.php',datos).then(response => console.log(response));

 };
     
 
 
 
 
 
   
 const aprobar = (comment, usuario) => {
  console.log(comment);

  axios.get("http://localhost/proyectoTiendas/getEmail.php?id="+usuario)
  .then(response=>{
    console.log(response.data);
    setEm(response.data.correo);

    emailjs.send("service_anoqq7g","template_c17c7a8",{
      to_name: "Usuario: "+usuarioR,
      message: "Le informamos que su comentario fue aprobado",
      to_email: response.data.correo,
      reply_to: "caceres191453@unis.edu.gt",
    },"NZQzHmJIncXZui78F");
    
  }).catch(error=>{
    console.log(error);
  });

  const datos = {
      "id": comment
    };
    console.log(datos);
    
  
  axios.post('http://localhost/proyectoTiendas/aprobarComentario.php', datos).then(response => console.log(response));
 
 
   }
 
 
 
 
   React.useEffect(() => {
 
       axios.get("http://localhost/proyectoTiendas/getComentariosPendientes.php")
       .then(response=>{
         console.log(response.data);
         setRows(response.data);
         
       }).catch(error=>{
         console.log(error);
       });
 
     
 
     }, []);
 
   return (
     <TableContainer component={Paper}>
         <h2>Comentarios por Aprobar</h2> 
       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>
             <TableCell align="right">Comentario</TableCell>
             <TableCell align="right">Tipo Comentario</TableCell>
             <TableCell align="right">Usuario</TableCell>
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
               <TableCell align="right">{ro.comentario}</TableCell>
               <TableCell align="right">{ro.tienda==0?"Producto":"Tienda"}</TableCell>
               <TableCell align="right">{ro.id_usuario}</TableCell>
               <TableCell align="right"> <Button variant="contained"  onClick={()=>aprobar(ro.id)}>Aprobar Cambios</Button> </TableCell>
               <TableCell align="right"> <Button variant="contained"  onClick={()=>rechazar(ro.id_usuario, ro.id)}>Rechazar Cambios</Button> </TableCell>
             </TableRow>
             
           ))}
           
         </TableBody>
       </Table>
     </TableContainer>
   );
 }