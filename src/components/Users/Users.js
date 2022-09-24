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
import { useState } from 'react';
import { MenuItem, Select } from '@mui/material';



export default function DenseTable() {

    //Get User List
    const [row, setRow]=useState([]);
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/adminusuarios.php")
        .then(response=>{
          setRow(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(row);

      }, []);

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);


  const editarUsuario = (usuario) => {
    setOpen(true);
    localStorage.setItem('editusuario', usuario);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('editusuario');
  };

  const eliminarUsuario = (usuario) => {
    setOpenD(true);
    console.log(usuario);
    localStorage.setItem('editusuario', usuario);
  }
  const handleCloseD = () => {
    setOpenD(false);
    localStorage.removeItem('editusuario');
  }
  //Toma de datos
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let dataEnviar = new FormData();
    dataEnviar.append('id', localStorage.getItem('editusuario'));
    dataEnviar.append('firstName', data.get('firstName'));
    dataEnviar.append('lastName', data.get('lastName'));
    dataEnviar.append('correo', data.get('email'));
    dataEnviar.append('contrasena', data.get('password'));
    dataEnviar.append('id_tipousuario', data.get('tipoUsuario'));

    /*const data = new FormData(event.currentTarget);
    const dataEnviar = {
      id: localStorage.getItem('usuario'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),  
      correo: data.get('email'),
      contrasena: data.get('password'),
      id_tipousuario: data.get('tipoUsuario')
    }*/
    console.log(dataEnviar);
    axios.post('http://localhost/proyectoTiendas/updateusuarios.php',dataEnviar).then(response => console.log(response));
  };

  const elminarUsuarioA = (event) =>{
      setOpenD(false);
      event.preventDefault();
    let dataEnviar = new FormData();
    dataEnviar.append('id', localStorage.getItem('editusuario'));

    /*const data = new FormData(event.currentTarget);
    const dataEnviar = {
      id: localStorage.getItem('usuario'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),  
      correo: data.get('email'),
      contrasena: data.get('password'),
      id_tipousuario: data.get('tipoUsuario')
    }*/
    console.log(dataEnviar);
    axios.post('http://localhost/proyectoTiendas/deleteusuario.php',dataEnviar).then(response => console.log(response));
    localStorage.removeItem('editusuario');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Tipo Usuario</TableCell>
            <TableCell align="center"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((ro) => (
            <TableRow
              key={ro.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ro.id}
              </TableCell>
              <TableCell align="right">{ro.firstName}</TableCell>
              <TableCell align="right">{ro.lastName}</TableCell>
              <TableCell align="right">{ro.correo}</TableCell>
              <TableCell align="right">{ro.contrasena}</TableCell>
              <TableCell align="right">{ro.id_tipousuario}</TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>editarUsuario(ro.id)}>Edit</Button>  <Button variant="outlined" onClick={()=>eliminarUsuario(ro.id)}>Del</Button></TableCell>
            </TableRow>
            
          ))}
          
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <DialogTitle id="alert-dialog-title">
          {"Editar usuario"}
        </DialogTitle>
                
                        <DialogContent>
                            <h4>ID: {localStorage.getItem("usuario")}</h4>
                            <h4>Nombre: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="firstName"/> <br/>
                            <h4>Apellido: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="lastName"/> <br/>
                            <h4>Correo: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="email"/> <br/>
                            <h4>Password: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="password"/> <br/>
                            <h4>id_tipousuario:</h4>
                            <select name="tipoUsuario">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                            
                        </DialogContent>
                
            <DialogActions>
                <Button type="submit"> Editar</Button>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
            </Box>
        </Dialog>


        <Dialog
            open={openD}
            onClose={handleCloseD}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Editar usuario"}
        </DialogTitle>
                        <DialogContent>
                            <h4>Desea eliminar el usuario: {localStorage.getItem('usuario')}</h4>
                        </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={elminarUsuarioA}> Eliminar</Button>
                <Button onClick={handleCloseD}>Cerrar</Button>
            </DialogActions>
        </Dialog>
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}
