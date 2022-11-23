import * as React from 'react';

import axios from 'axios';

import { useState, useContext } from 'react';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';




export default function ReportesProductos() {
  



    const [row, setRow]=useState([]);

    const [filtro1, setFilro1]=useState("0");
    const [filtro2, setFilro2]=useState("");


    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/filtrarProductos.php?filtro1=0&filtro2=&inicio=&fin=")
        .then(response=>{
          setRow(response.data);
          console.log(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(row);

      }, []);


     const getData=(f1, f2, ini, fin)=>{
        console.log(f1);

        setFilro1(f1);
        setFilro2(f2);
        setFechaInicio(ini);
        setFechaFin(fin);

        axios.get("http://localhost/proyectoTiendas/filtrarProductos.php?filtro1="+f1+"&filtro2="+f2+"&inicio="+ini+"&fin="+fin)
        .then(response=>{
          setRow(response.data);
          console.log(response.data);
        }).catch(error=>{
          console.log(error);
          
        });
        console.log(row);

     }
  

  return (
    <TableContainer component={Paper} sx={{justifyContent: "center" }} >
      <h3>Productos</h3>
      <p>Filtrar por:</p>
      <select onChange={e=>setFilro1(e.target.value)}>
        <option value="0" selected>Seleccionar</option>
        <option value="conteo">Cantidad Imágenes</option>
        <option value="habilitado">{"Habilitado (0/1)"}</option>
        <option value="id_tienda">Tienda</option>
        <option value="descripcion">Descripcion</option>
        <option value="precio">Precio</option>
        <option value="nombre">Nombre</option>
      </select>
      <p>Contiene:</p>
      <input type="text" onChange={e=>getData(filtro1, e.target.value, fechaInicio, fechaFin)}/>
      <p>Entre las fechas:</p>
      <input type="date" onChange={e=>getData(filtro1, filtro2, e.target.value, fechaFin)}/>{" y "} <input type="date" onChange={e=>getData(filtro1, filtro2, fechaInicio, e.target.value)}/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="tabla-prods">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Producto</TableCell>
            <TableCell align="right">Habilitado</TableCell>
            <TableCell align="right">Tienda</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="right">Fecha Creación</TableCell>
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
              <TableCell align="right">{ro.habilitado==0?"No":"Sí"}</TableCell>
              <TableCell align="right">{ro.id_tienda}</TableCell>
              <TableCell align="right">{ro.precio}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
              <TableCell align="right">{ro.fecha}</TableCell>
            </TableRow>))}
        
        </TableBody>
      </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-prods"
                    filename="tabla-productos"
                    sheet="productos"
                    buttonText="DESCARGAR REPORTE"
                    />
    </TableContainer>
  );
}