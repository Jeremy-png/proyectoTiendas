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



export default function Tiendas() {

    //Get User List
    const [tiendas, setTiendas]=useState([]);
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/tiendas.php")
        .then(response=>{
          console.log(response.data);
          setTiendas(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(tiendas);

      }, []);

    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);


  const editarTienda = (tienda, cambio) => {
    let dataEnviar = new FormData();
    if(cambio == 1){
        dataEnviar.append('cambio', '0');
    }else{
        dataEnviar.append('cambio', '1');
    }
    
    dataEnviar.append('id', tienda);

    axios.post("http://localhost/proyectoTiendas/habilitarTienda.php", dataEnviar)
    .then(response=>{
      console.log(response.data);
      
    }).catch(error=>{
      console.log(error);
    });
  };



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Creador</TableCell>
            <TableCell align="right">Coordenadas</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Telefono</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="center">Logotipo</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Cambiar Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tiendas.map((ro) => (
            <TableRow
              key={ro.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ro.id}
              </TableCell>
              <TableCell align="right">{ro.nombre}</TableCell>
              <TableCell align="right">{ro.id_usuario}</TableCell>
              <TableCell align="right">{ro.longitud + ", " + ro.latitud }</TableCell>
              <TableCell align="right">{ro.link}</TableCell>
              <TableCell align="right">{ro.telefono}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
              <TableCell align="center"><img className="patente" src={ro.foto_logo} width="128"></img></TableCell>
              <TableCell align="right">{ro.habilitado==1?"Activa":"Inactiva"}</TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>editarTienda(ro.id, ro.habilitado)}>E</Button> </TableCell>
            </TableRow>
            
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}