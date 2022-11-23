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

  const [row, setRow]=useState([]);
  React.useEffect(() => {
    axios.get("http://localhost/proyectoTiendas/categorias.php")
      .then(response=>{
        setRow(response.data);
        
      }).catch(error=>{
        console.log(error);
      });
      console.log(row);

    }, []);

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
    const dataEnviar = {
      name : data.get('categoria'),
      tienda: data.get('tCategoria'),
      id: localStorage.getItem('categoria')

    };
    console.log(dataEnviar);
    
    axios.post('http://localhost/proyectoTiendas/updateCategoria.php',dataEnviar).then(response => console.log(response));
  };

  const crearCategoria = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const dataEnviar = {
        name : data.get('categoria'),
        tienda: data.get('tCategoria')

      };
      console.log(dataEnviar);
    
    axios.post('http://localhost/proyectoTiendas/nuevaCategoria.php',dataEnviar).then(response => console.log(response));
  };


  return (
    <TableContainer component={Paper}>
        <Button onClick={()=>nuevoCategoria()}>Añadir Categoria</Button> 
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
              key={ro.value}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ro.value}
              </TableCell>
              <TableCell align="right">{ro.label}</TableCell>
              <TableCell align="right">{ro.tienda==1?"Tienda":"Producto"}</TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>editarCategoria(ro.value)}>Edit</Button></TableCell>
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