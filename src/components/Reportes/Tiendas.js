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




export default function ReportesTiendas() {
  



    const [row, setRow]=useState([]);

    const [filtro1, setFilro1]=useState("0");
    const [filtro2, setFilro2]=useState("");


    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/filtrarTiendas.php?filtro1=0&filtro2=&inicio=&fin=")
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

        axios.get("http://localhost/proyectoTiendas/filtrarTiendas.php?filtro1="+f1+"&filtro2="+f2+"&inicio="+ini+"&fin="+fin)
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
      <h3>Tiendas</h3>
      <p>Filtrar por:</p>
      <select onChange={e=>setFilro1(e.target.value)}>
        <option value="0" selected>Seleccionar</option>
        <option value="nombre">Nombre</option>
        <option value="id_usuario">Usuario</option>
        <option value="habilitado">{"Habilitado (0/1)"}</option>
        <option value="link">Link</option>
        <option value="descripcion">Descripcion</option>
        <option value="longitud">Longitud</option>
        <option value="latitud">Latitud</option>
        <option value="telefono">Teléfono</option>
        <option value="zona">Zona</option>
        <option value="departamento">Departamento</option>
        <option value="municipio">Municipio</option>
      </select>
      <p>Contiene:</p>
      <input type="text" onChange={e=>getData(filtro1, e.target.value, fechaInicio, fechaFin)}/>
      <p>Entre las fechas:</p>
      <input type="date" onChange={e=>getData(filtro1, filtro2, e.target.value, fechaFin)}/>{" y "} <input type="date" onChange={e=>getData(filtro1, filtro2, fechaInicio, e.target.value)}/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="tabla-tiendas">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Coordenadas</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Teléfono</TableCell>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Dirección</TableCell>
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
              <TableCell align="right">{ro.longitud + ", " + ro.latitud }</TableCell>
              <TableCell align="right">{ro.link}</TableCell>
              <TableCell align="right">{ro.telefono}</TableCell>
              <TableCell align="right">{ro.descripcion}</TableCell>
              <TableCell align="right">{ro.habilitado==1?"Activa":"Inactiva"}</TableCell>
              <TableCell align="right">{ro.municipio + ", "+ ro.departamento + ", Zona: "+ ro.zona}</TableCell>
           
            </TableRow>
            
          ))}
        
        </TableBody>
      </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-tiendas"
                    filename="tabla-tiendas"
                    sheet="tiendas"
                    buttonText="DESCARGAR REPORTE"
                    />
    </TableContainer>
  );
}