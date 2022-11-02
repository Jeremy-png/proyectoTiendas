import { Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function TiendasCard(props) {



    return(
        <div style={{
            "border": "2px #ccc solid",
            "width": "20%",
            "height": "20em",
            "border-radius": "2%",
            "padding": "1%",
            "text-align": "center"
        }}>
            <img style={{"width": "40%"}} src={props.logo}/>
            <h4>{props.nombre}</h4>
            <p>{props.descripcion}</p>
            <p><b>{"Teléfono: "+ props.telefono}</b></p>
            <Link to={`/showTienda/${props.id}`}>
                <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Ver
            </Button>
            </Link>
            
        </div>
    );
}