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




export default function ComentariosTiendas() {
  



    const [row, setRow]=useState([]);

    const [filtro1, setFilro1]=useState("0");
    const [filtro2, setFilro2]=useState("");


    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/filtrarComentariosTiendas.php?filtro1=0&filtro2=&inicio=&fin=")
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

        axios.get("http://localhost/proyectoTiendas/filtrarComentariosTiendas.php?filtro1="+f1+"&filtro2="+f2+"&inicio="+ini+"&fin="+fin)
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
      <h3>Comentarios y Calificaciones Tiendas</h3>
      <p>Ordenar por:</p>
      <select onChange={e=>setFilro1(e.target.value)}>
        <option value="0" selected>Seleccionar</option>
        <option value="comentarios"># de Comentarios</option>
        <option value="rating">Rating</option>
        <option value="cantidad_votos"># de Votos</option>
      </select>
      <select onChange={e=>getData(filtro1, e.target.value, fechaInicio, fechaFin)}>
        <option value="" selected>Seleccionar</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <p>Entre las fechas:</p>
      <input type="date" onChange={e=>getData(filtro1, filtro2, e.target.value, fechaFin)}/>{" y "} <input type="date" onChange={e=>getData(filtro1, filtro2, fechaInicio, e.target.value)}/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="tabla-comentarios_tiendas">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tienda</TableCell>
            <TableCell align="right">Usuario Dueño</TableCell>
            <TableCell align="right"># de Comentarios</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Cantidad Votos</TableCell>
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
              <TableCell align="right">{ro.id_usuario}</TableCell>
              <TableCell align="right">{ro.comentarios}</TableCell>
              <TableCell align="right">{ro.rating}</TableCell>
              <TableCell align="right">{ro.cantidad_votos}</TableCell>
              <TableCell align="right">{ro.fecha}</TableCell>
            </TableRow>))}
        
        </TableBody>
      </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-comentarios_tiendas"
                    filename="tabla-comentarios_tiendas"
                    sheet="comentarios_tiendas"
                    buttonText="DESCARGAR REPORTE"
                    />
    </TableContainer>
  );
}