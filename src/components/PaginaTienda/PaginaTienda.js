import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
//import { GoogleMap, withScriptsjs, withGoogleMap } from 'react-google-maps';
import GoogleMaps from 'simple-react-google-maps'
import Comments from '../../comments/comments';
import BasicRating from '../Rating/Rating';

export default function PaginaTienda() {

    const { id } = useParams();

    const [tienda, setTienda]=useState({});
    const [rating, setRating]=useState({});
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/paginaTienda.php?id=" + id)
        .then(response=>{
          console.log(response.data);
          setTienda(response.data);
          console.log();
        }).catch(error=>{
          console.log(error);
        });
        console.log(tienda);
      }, []);

      React.useEffect(() => {
        axios.get("http://localhost/proyectoTiendas/obtenerRatingTienda.php?id=" + id)
          .then(response=>{
            setRating(response.data);
            //console.log(response.data);
          }).catch(error=>{
            console.log(error);
          });
        }, []);
    
    return(
        <div>
          <div style={{
            "margin":"3% ",
            "display": "flex"
        }}>
            <div style={{"width": "50%"}}>
                <img src={tienda.foto_logo} style={{"height":"40vh", "width":"40vh"}} />
            </div>
            <div style={{
                "border": "2px #ccc solid ",
                "width": "40%",
                "padding": "2%",
                "height": "100%"
            }}>
                <Typography component="h1" variant="h5">{"TIENDA: "+tienda.nombre}</Typography> 
                <p>Telefono: {tienda.telefono}</p>
                <p>Link: <span>{tienda.link}</span></p>
                <h4><b>Decripcion:</b></h4>
                <p>{tienda.descripcion}</p>
                <p><b>Rating de la tienda: </b>{rating['avg(rating)']} <b>estrellas</b></p>
                <h4><b>Ubicación:</b></h4>
                <p>{tienda.municipio + ", "+ tienda.departamento + ", Zona: "+ tienda.zona}</p>
            </div>
        </div>
            <div>
               <GoogleMaps
                  style={{height:"400px", width:"400px"}}
                  zoom={15}
                  center={{ lat: Number(tienda.latitud), lng: Number(tienda.longitud)}}
                  apiKey={"AIzaSyA98aIiid_JF-_CF01rz8TnHKKQZQ0OE-E"}
               />

            </div>
            <Comments tienda={1} id={id}/>
            <BasicRating
            userID={localStorage.getItem('id_usuario')}
            itemID={useParams().id}
            URL="http://localhost/proyectoTiendas/ratingTienda.php"
            />

        </div>
    );
}