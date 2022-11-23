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




export default function Usuarios() {
  



    const [row, setRow]=useState([]);

    const [filtro1, setFilro1]=useState("0");
    const [filtro2, setFilro2]=useState("0");
    const [filtro3, setFilro3]=useState("0");

    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFin, setFechaFin]=useState("");

    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/adminusuarios.php")
        .then(response=>{
          setRow(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(row);

      }, []);


     const getData=(f1, f2, f3, ini, fin)=>{
        console.log(f1);

        setFilro1(f1);
        setFilro2(f2);
        setFilro2(f3);
        setFechaInicio(ini);
        setFechaFin(fin);

        const dataEnviar = {
          filtro1: f1,
          filtro2: f2,
          filtro3: f3,
          inicio: ini,
          fin: fin
        };

        axios.get("http://localhost/proyectoTiendas/filtrarUsuarios.php?filtro1="+f1+"&filtro2="+f2+"&filtro3="+f3+"&inicio="+ini+"&fin="+fin)
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
      <h3>Usuarios</h3>
      <p>Ordenar por:</p>
      <select onChange={e=>getData(e.target.value, filtro2, filtro3, fechaInicio, fechaFin)}>
        <option value="0" selected>Seleccionar</option>
        <option value="firstName">Nombre</option>
        <option value="lastName">Apellido</option>
        <option value="correo">Correo</option>
        <option value="id_tipoUsuario">Tipo Usuario</option>
      </select>
      <select onChange={e=>getData(filtro1, e.target.value, filtro3, fechaInicio, fechaFin)}>
        <option value="0" selected>Seleccionar</option>
        <option value="firstName">Nombre</option>
        <option value="lastName">Apellido</option>
        <option value="correo">Correo</option>
        <option value="id_tipoUsuario">Tipo Usuario</option>
      </select>
      <select onChange={e=>getData(filtro1, filtro2, e.target.value, fechaInicio, fechaFin)}>
        <option value="0" selected>Seleccionar</option>
        <option value="firstName">Nombre</option>
        <option value="lastName">Apellido</option>
        <option value="correo">Correo</option>
        <option value="id_tipoUsuario">Tipo Usuario</option>
      </select>
      <p>Entre las fechas:</p>
      <input type="date" onChange={e=>getData(filtro1, filtro2, filtro3, e.target.value, fechaFin)}/>{" y "} <input type="date" onChange={e=>getData(filtro1, filtro2, filtro3, fechaInicio, e.target.value)}/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" id="tabla-users">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Tipo Usuario</TableCell>
            <TableCell align="right">Fecha de Creación</TableCell>
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
              <TableCell align="right">{ro.firstName}</TableCell>
              <TableCell align="right">{ro.lastName}</TableCell>
              <TableCell align="right">{ro.correo}</TableCell>
              <TableCell align="right">{ro.id_tipousuario}</TableCell>
              <TableCell align="right">{ro.fecha}</TableCell>
            </TableRow>
            
          ))}
        
        </TableBody>
      </Table>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="tabla-users"
                    filename="tabla-users"
                    sheet="usuarios"
                    buttonText="DESCARGAR REPORTE"
                    />
    </TableContainer>
  );
}