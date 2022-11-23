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




export default function ReportesRechazos() {
  



    const [row, setRow]=useState([]);

    const [filtro1, setFilro1]=useState('0');
    const [filtro2, setFilro2]=useState("");


    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/filtrarRechazos.php?inicio=&fin=&emp=0")
        .then(response=>{
          setRow(response.data);
          console.log(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(row);

      }, []);


     const getData=(ini, fin, user)=>{
        

      
        setFechaInicio(ini);
        setFechaFin(fin);
        setFilro1(user);
        

        axios.get("http://localhost/proyectoTiendas/filtrarRechazos.php?inicio="+ini+"&fin="+fin+"&emp="+user)
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
      <h3>Rechazos: </h3>
      <p>Ordenar por:</p>
      <select onChange={e=>getData(fechaInicio, fechaFin, e.target.value)}>
        <option value="0" selected>Usuarios con más Rechazdos</option>
        <option value="1">Empleados con más rechazos realizados</option>
      </select>
      <p>Entre las fechas:</p>
      <input type="date" onChange={e=>getData(e.target.value, fechaFin, filtro1)}/>{" y "} <input type="date" onChange={e=>getData(fechaInicio, e.target.value, filtro1)}/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="tabla-rechazos">
      <TableHead>
          <TableRow>
            <TableCell>{filtro1=='0'?"ID Usuario Rechazado":"ID Empleado"}</TableCell>
            <TableCell align="right"># de Comentarios Rechazados</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((ro) => (
            <TableRow
              key={ro.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {filtro1=='0'?ro.usuario_rechazado:ro.usuario_empleado}
              </TableCell>
              <TableCell align="right">{ro.conteo}</TableCell>
            </TableRow>))}
        
        </TableBody>
      </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-rechazos"
                    filename="tabla-rechazos"
                    sheet="rechazos"
                    buttonText="DESCARGAR REPORTE"
                    />
    </TableContainer>
  );
}