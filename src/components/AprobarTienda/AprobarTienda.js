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
 
 
 export default function AprobarTienda() {
 
   const{
     username, setUsername, setTipoUsuario, tipoUsuario
 } = useContext(LoginContext);
 
 
 
    const [idT, setIdT] = React.useState('');
    const [usuarioR, setUsuarioR] = React.useState('');
    const [em, setEm] = React.useState('');
    const [motivo, setMotivo] = React.useState('');
    const [openN, setOpenN] = React.useState(false);

     const [row, setRows]=useState([]);

     const rechazar = (usuario, id) => {
      setOpenN(true);
      setIdT(id)
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
        message: "Le informamos que los cambios realizados a su tienda fueron rechazados, por el siguiente motivo: "+ motivo,
        to_email: em,
        reply_to: "caceres191453@unis.edu.gt",
      },"NZQzHmJIncXZui78F");

      const datos = {
        "usuario": usuarioR,
        "empleado": localStorage.getItem("id_usuario"),
        "razon": motivo,
        "contenido": 't',
        "id": idT
      };
      console.log(datos);

      axios.post('http://localhost/proyectoTiendas/nuevoRechazo.php',datos).then(response => console.log(response));

    };
   
 
    const aprobar = (tienda, usuario) => {
      console.log(tienda);
 
      axios.get("http://localhost/proyectoTiendas/getEmail.php?id="+usuario)
      .then(response=>{
        console.log(response.data);
        setEm(response.data.correo);

        emailjs.send("service_anoqq7g","template_c17c7a8",{
          to_name: "Usuario: "+usuarioR,
          message: "Le informamos que los cambios realizados a su tienda fueron aprobados",
          to_email: response.data.correo,
          reply_to: "caceres191453@unis.edu.gt",
        },"NZQzHmJIncXZui78F");
        
      }).catch(error=>{
        console.log(error);
      });
  
      const datos = {
          "id": tienda
        };
        console.log(datos);
        
      
      axios.post('http://localhost/proyectoTiendas/aprobarTienda.php', datos).then(response => console.log(response));
  
  
    }
 
 
 
 
   React.useEffect(() => {
 
       axios.get("http://localhost/proyectoTiendas/tiendasPendientes.php")
       .then(response=>{
         console.log(response.data);
         setRows(response.data);
         
       }).catch(error=>{
         console.log(error);
       });
 
     
 
     }, []);
 
   return (
     <TableContainer component={Paper}>
         <h2>Tiendas por Aprobar</h2> 
       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
         <TableHead>
           <TableRow>
           <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Creador</TableCell>
            <TableCell align="right">Coordenadas</TableCell>
            <TableCell align="right">Zona</TableCell>
            <TableCell align="right">Departamento</TableCell>
            <TableCell align="right">Municipio</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Telefono</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="center">Logotipo</TableCell>
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
          {"Rechazar Tienda"}
        </DialogTitle>
        
        <DialogContent>
            <h4>ID: {ro.id}</h4>
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
              <TableCell align="right">{ro.id_usuario}</TableCell>
              <TableCell align="right">{ro.longitud + ", " + ro.latitud}</TableCell>
              <TableCell align="right">{ro.zona}</TableCell>
              <TableCell align="right">{ro.departamento}</TableCell>
              <TableCell align="right">{ro.municipio}</TableCell>
              <TableCell align="right">{ro.link}</TableCell>
              <TableCell align="right">{ro.telefono}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
              <TableCell align="center"><img className="patente" src={ro.foto_logo} width="128"></img></TableCell>
               <TableCell align="right"> <Button variant="contained"  onClick={()=>aprobar(ro.id,ro.id_usuario)}>Aprobar Cambios</Button> </TableCell>
               <TableCell align="right"> <Button variant="contained"  onClick={()=>rechazar(ro.id_usuario, ro.id)}>Rechazar Cambios</Button> </TableCell>
             </TableRow>
             
           ))}
           
         </TableBody>
       </Table>

       
     </TableContainer>
   );
 }