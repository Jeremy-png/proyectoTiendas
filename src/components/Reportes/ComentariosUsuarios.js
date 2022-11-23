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




export default function ComentariosUsuarios() {
  



    const [row, setRow]=useState([]);

    const [filtro1, setFilro1]=useState("0");
    const [filtro2, setFilro2]=useState("");


    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/filtrarComentariosUsuarios.php?inicio=&fin=")
        .then(response=>{
          setRow(response.data);
          console.log(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(row);

      }, []);


     const getData=(ini, fin)=>{
        

      
        setFechaInicio(ini);
        setFechaFin(fin);

        axios.get("http://localhost/proyectoTiendas/filtrarComentariosUsuarios.php?inicio="+ini+"&fin="+fin)
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
      <h3>Usuarios con más comentarios</h3>
      <p>Entre las fechas:</p>
      <input type="date" onChange={e=>getData(e.target.value, fechaFin)}/>{" y "} <input type="date" onChange={e=>getData(fechaInicio, e.target.value)}/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="tabla-comentarios-usuarios">
      <TableHead>
          <TableRow>
            <TableCell>ID Usuario</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right"># de Comentarios Realizados</TableCell>
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
              <TableCell align="right">{ro.firstName+" "+ro.lastName}</TableCell>
              <TableCell align="right">{ro.comentarios}</TableCell>
            </TableRow>))}
        
        </TableBody>
      </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-comentarios-usuarios"
                    filename="tabla-comentarios-usuarios"
                    sheet="comentarios-usuarios"
                    buttonText="DESCARGAR REPORTE"
                    />
    </TableContainer>
  );
}