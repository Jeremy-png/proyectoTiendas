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




export default function RegistroProductos() {

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




    const nuevoProducto = () => {
      if(localStorage.getItem('tienda')==0)  {
        alert("Solo puede añadir un producto si es empleado de una tienda");
      }else{
        setOpenN(true);
      }
       
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
        "nombre": data.get('producto'),
        "precio": data.get('precio'),
        "descripcion": data.get('descripcion'),
        "img2": data.get('img2'),
        "img3": data.get('img3'),
        "img1": data.get('img1'),
        "idTienda": localStorage.getItem("tienda"),
        "categorias": selected,
        "id": localStorage.getItem("usuario")

      };
      console.log(datos);
      
    
    axios.post('http://localhost/proyectoTiendas/editProducto.php', datos).then(response => console.log(response));
  };

  const crearProducto = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const datos = {
      "nombre": data.get('producto'),
      "precio": data.get('precio'),
      "descripcion": data.get('descripcion'),
      "img2": data.get('img2'),
      "img3": data.get('img3'),
      "img1": data.get('img1'),
      "idTienda": localStorage.getItem('tienda'),
      "categorias": selected

    };
    console.log(datos);
  
  axios.post('http://localhost/proyectoTiendas/nuevoProducto.php', datos).then(response => console.log(response));
  };

  const elminarUsuarioA = () =>{
      localStorage.removeItem('usuario');
      setOpenD(false);
  };

  React.useEffect(() => {
    axios.get("http://localhost/proyectoTiendas/categoriasProductos.php")
      .then(response=>{
        console.log(response.data);
        setOptions(response.data);
        
      }).catch(error=>{
        console.log(error);
      });

      axios.get("http://localhost/proyectoTiendas/getTienda.php", {params: {id: localStorage.getItem('id_usuario')}})
      .then(response=>{
        console.log(response.data);
        setTienda(response.data);
        //localStorage.setItem("tienda",response.data.id)
        
        
      }).catch(error=>{
        console.log(error);
      });

      axios.get("http://localhost/proyectoTiendas/getProductosAprobados.php")
      .then(response=>{
        console.log(response.data);
        setRows(response.data);
        
      }).catch(error=>{
        console.log(error);
      });

    
      //console.log("Tienda: "+tienda.id);

    }, []);

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
                            <h4>Link Imagen 1: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="img1"/> <br/>
                            <h4>Link Imagen 2: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="img2"/> <br/>
                            <h4>Link Imagen 3: </h4>
                            <TextField id="outlined-basic" variant="outlined" name="img3"/> <br/>
                            <h4>Seleccionar Categoría</h4>
                            <pre>{JSON.stringify(selected)}</pre>
                            <MultiSelect
                              options={options}
                              value={selected}
                              onChange={setSelected}
                              labelledBy="Seleccionar"
                            />
                               
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
            <h4>ID: {localStorage.getItem("usuario")}</h4>
            <h4>Producto: </h4>
            <TextField id="outlined-basic" variant="outlined" name="producto"/> <br/>
            <h4>Precio: </h4>
            <TextField id="outlined-basic" variant="outlined" name="precio"/> <br/>
            <h4>Descripcion: </h4>
            <TextField id="outlined-basic" variant="outlined" name="descripcion"/> <br/>
            <h4>Link Imagen 1: </h4>
            <TextField id="outlined-basic" variant="outlined" name="img1"/> <br/>
            <h4>Link Imagen 2: </h4>
            <TextField id="outlined-basic" variant="outlined" name="img2"/> <br/>
            <h4>Link Imagen 3: </h4>
            <TextField id="outlined-basic" variant="outlined" name="img3"/> <br/>
            <h4>Seleccionar Categoría</h4>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Seleccionar"
            />

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