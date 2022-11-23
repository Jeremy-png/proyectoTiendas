import { Button } from '@material-ui/core';
import { Alert, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default function CargaMasiva(props) {

 const [xml, setXML] = React.useState('');
 const [file, setFile] = React.useState(null);
 const [xml2, setXML2] = React.useState('');
 const [file2, setFile2] = React.useState(null);
 

 const handleChange =(e)=>{
    if(e.target.files[0]){
        setXML(e.target.files[0].name);
        setFile(e.target.files[0]);
       
    }else{
        setXML('');
    }
 }

 const handleChange2 =(e)=>{
    if(e.target.files[0]){
        setXML2(e.target.files[0].name);
        setFile2(e.target.files[0]);
       
    }else{
        setXML2('');
    }
 }

   const submitData=()=>{
    const url = "http://localhost/proyectoTiendas/cargaProds.php";
    let formData = new FormData();
    formData.append('file', xml);
    formData.append('xml', file);
       
        axios.post(url, formData)
        .then((response)=> {
            console.log(response);
            setXML('');
        })
        .catch((response)=> {
            console.log(response);
        });
   }

   const submitData2=()=>{
    const url = "http://localhost/proyectoTiendas/cargaTienda.php";
    let formData = new FormData();
    formData.append('file', xml2);
    formData.append('xml', file2);
       
        axios.post(url, formData)
        .then((response)=> {
            console.log(response);
            setXML2('');
        })
        .catch((response)=> {
            console.log(response);
        });
   }

   const al=()=>{
    alert("Solo puede añadir un archivo si tiene una tienda");
   }

    return(
        <div className="import-page">
            <h1>Cargar Productos Tienda:</h1>
                <form id="sample_form">
                    <Grid container direction={"column"} spacing={1}>
                        <Grid item >
                            <label >Seleccionar el archivo XML</label>
                        </Grid>
                        <Grid item >
                        <TextField type="file" name="xml-file" id="xml-file" inputProps={{ accept: '.xml' }}  onChange={e=>handleChange(e)}/>  
                        </Grid>
                        <Grid item >
                            <Button name="import" id="import" value="Enviar a la base de datos" onClick={localStorage.getItem('tienda')!=0?submitData:al}>Enviar a la base de datos</Button>
                        </Grid>
                    </Grid>
                </form>

                <h1>Cargar Tienda:</h1>
                <form id="sample_form">
                    <Grid container direction={"column"} spacing={1}>
                        <Grid item >
                            <label >Seleccionar el archivo XML</label>
                        </Grid>
                        <Grid item >
                        <TextField type="file" name="xml-file-2" id="xml-file-2" inputProps={{ accept: '.xml' }}  onChange={e=>handleChange2(e)}/>  
                        </Grid>
                        <Grid item >
                            <Button name="import-2" id="import-2" value="Enviar a la base de datos" onClick={localStorage.getItem('tienda')!=0?submitData2:al}>Enviar a la base de datos</Button>
                        </Grid>
                    </Grid>
                </form>
    </div>
    );
}