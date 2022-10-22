
import { Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';


export default function ShowProductComponent(props) {

    return(
        <div style={{
            "margin":"3% ",
            "display": "flex"
        }}>
            <div style={{"width": "50%"}}>
                <img src={props.img} style={{"width": "70%", "height":"40%"}} />
                <img src={props.img2} style={{"width": "35%", "height":"25%"}} />
                <img src={props.img3} style={{"width": "35%", "height":"25%"}}/>
            </div>
            <div style={{
                "border": "2px #ccc solid ",
                "width": "40%",
                "padding": "2%",
                "height": "100%"
            }}>
                <Typography component="h1" variant="h5">{props.title}</Typography> 
                <p>Precio: {props.price}</p>
                <p>Categoria: {props.category}</p>
                <h4><b>Decripcion:</b></h4>
                <p>{props.description}</p>
            </div>
        </div>
    );
}