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



export default function RegistroProductos() {

    const row = [
        {
        id: 1,
        producto: "Prueba1",
        precio: "Prueba1",  
        descripcion: "Prueba1",
        },
        {
        id: 1,
        producto: "Prueba1",
        precio: "Prueba1",  
        descripcion: "Prueba1",
        }
]

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);
    const [openN, setOpenN] = React.useState(false);



    const nuevoProducto = () => {
        setOpenN(true);
      };

      const handleCloseN = () => {
        setOpenN(false);

      };

  const editarUsuario = (usuario) => {
    setOpen(true);
    localStorage.setItem('usuario', usuario);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('usuario');
  };

  const eliminarUsuario = (usuario) => {
    setOpenD(true);
    console.log(usuario);
    localStorage.setItem('usuario', usuario);
  }
  const handleCloseD = () => {
    setOpenD(false);
    localStorage.removeItem('usuario');
  }
  //Toma de datos
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const datos = {
        "producto": data.get('producto'),
        "precio": data.get('precio'),
        "descripcion": data.get('descripcion'),

      };
      console.log(datos);
    
    //axios.post('http://localhost/proyectoTiendas/updateusuarios.php',dataEnviar).then(response => console.log(response));
  };

  const crearProducto = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const datos = {
        "producto": data.get('producto'),
        "precio": data.get('precio'),
        "descripcion": data.get('descripcion'),

      };
      console.log(datos);
    
    //axios.post('http://localhost/proyectoTiendas/updateusuarios.php',dataEnviar).then(response => console.log(response));
  };

  const elminarUsuarioA = () =>{
      localStorage.removeItem('usuario');
      setOpenD(false);
  };

  return (
    <TableContainer component={Paper}>
        <Button onClick={()=>nuevoProducto()}>Add Product</Button> 
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Producto</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Descripcion</TableCell>
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
              <TableCell component="th" scope="row">
                {ro.id}
              </TableCell>
              <TableCell align="right">{ro.producto}</TableCell>
              <TableCell align="right">{ro.precio}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
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
                            <h4>Producto: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="producto"/> <br/>
                            <h4>Precio: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="precio"/> <br/>
                            <h4>Descripcion: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="descripcion"/> <br/>   
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
        

        <Dialog
            open={openN}
            onClose={handleCloseN}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <Box component="form" noValidate onSubmit={crearProducto} sx={{ mt: 3 }}>
        <DialogTitle id="alert-dialog-title">
          {"Nuevo Producto"}
        </DialogTitle>
        
        <DialogContent>
                            <h4>Producto: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="producto"/> <br/>
                            <h4>Precio: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="precio"/> <br/>
                            <h4>Descripcion: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="descripcion"/> <br/>

            </DialogContent>
            <DialogActions>
                <Button type="submit" > Nuevo</Button>
                <Button onClick={handleCloseN}>Cerrar</Button>
            </DialogActions>
            </Box>
        </Dialog>

        </TableBody>
      </Table>
    </TableContainer>
  );
}