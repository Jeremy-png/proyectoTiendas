
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




export default function AprobarProductos() {

  const{
    username, setUsername, setTipoUsuario, tipoUsuario
} = useContext(LoginContext);





    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(false);
    const [openN, setOpenN] = React.useState(false);
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [tienda, setTienda] = useState(null);
    const [row, setRows]=useState([]);





  

  const aprobar = (usuario) => {
    console.log(usuario);
    localStorage.setItem('usuario', usuario);

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
              <TableCell component="th" scope="row">
                {ro.id}
              </TableCell>
              <TableCell align="right">{ro.nombre}</TableCell>
              <TableCell align="right">{ro.precio}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
              <TableCell align="right">{ro.categorias}</TableCell>
              <TableCell align="right"> <Button variant="contained"  onClick={()=>aprobar(ro.id)}>Aprobar Cambios</Button> </TableCell>
            </TableRow>
            
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}