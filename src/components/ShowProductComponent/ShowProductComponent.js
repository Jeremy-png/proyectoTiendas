import { Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ShowProductComponent(props) {

    const { id } = useParams();
    const [rating, setRating]=useState({});

    React.useEffect(() => {
        axios.get("http://localhost/proyectoTiendas/obtenerRatingProducto.php?id=" + id)
          .then(response=>{
            setRating(response.data);
            //console.log(response.data);
          }).catch(error=>{
            console.log(error);
          });
        }, []);

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
                <p>Precio: Q.{props.price}</p>
                <p>Categoria: {props.category}</p>
                <h4><b>Decripcion:</b></h4>
                <p>{props.description}</p>
                <p><b>Rating del producto: </b>{rating['avg(rating)']} <b>estrellas</b></p>
            </div>
        </div>
    );
}