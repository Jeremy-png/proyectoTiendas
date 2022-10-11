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



export default function Mantenimiento() {

    const row = [
        {
        id: 1,
        categoria: "Prueba1",
        tipoCategoria: "Prueba"
        },
        {
        id: 1,
        categoria: "Prueba1",
        tipoCategoria: "Prueba"
        }
]

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);
    const [openN, setOpenN] = React.useState(false);



    const nuevoCategoria = () => {
        setOpenN(true);
      };

      const handleCloseN = () => {
        setOpenN(false);

      };

  const editarCategoria = (categoria) => {
    setOpen(true);
    localStorage.setItem('categoria', categoria);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('categoria');
  };


  //Toma de datos
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const datos = {
        "categoria": data.get('categoria'),
        "tCategoria": data.get('tCategoria')

      };
      console.log(datos);
    
    //axios.post('http://localhost/proyectoTiendas/updateusuarios.php',dataEnviar).then(response => console.log(response));
  };

  const crearCategoria = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const datos = {
        "categoria": data.get('categoria'),
        "tCategoria": data.get('tCategoria')

      };
      console.log(datos);
    
    //axios.post('http://localhost/proyectoTiendas/updateusuarios.php',dataEnviar).then(response => console.log(response));
  };


  return (
    <TableContainer component={Paper}>
        <Button onClick={()=>nuevoCategoria()}>Add Product</Button> 
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Tipo de Categoria</TableCell>
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
              <TableCell align="right">{ro.categoria}</TableCell>
              <TableCell align="right">{ro.tipoCategoria}</TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>editarCategoria(ro.id)}>Edit</Button></TableCell>
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
          {"Editar categoria"}
        </DialogTitle>
                
                        <DialogContent>
                            <h4>Categoria: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="categoria"/> <br/>
                            <h4>tipoCategoria: </h4>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="tCategoria"
                              >
                                <MenuItem value={0}>Producto</MenuItem>
                                <MenuItem value={1}>Tienda</MenuItem>
                              </Select>
                        </DialogContent>
                
            <DialogActions>
                <Button type="submit"> Editar</Button>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
            </Box>
        </Dialog>
        <Dialog
            open={openN}
            onClose={handleCloseN}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <Box component="form" noValidate onSubmit={crearCategoria} sx={{ mt: 3 }}>
        <DialogTitle id="alert-dialog-title">
          {"Nuevo Categoria"}
        </DialogTitle>
        
        <DialogContent>
                            <h4>Categoria: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="categoria"/> <br/>
                            <h4>tipoCategoria: </h4>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="tCategoria"
                              >
                                <MenuItem value={0}>Producto</MenuItem>
                                <MenuItem value={1}>Tienda</MenuItem>
                              </Select>
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