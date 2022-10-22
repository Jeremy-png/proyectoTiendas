import { Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function CatalogoProductosComponent(props) {

    const [producto, setProducto]=useState([[]]);
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/productos_aprobados.php?id=1")
        .then(response=>{
          console.log(response.data);
          setProducto(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(producto);

      }, []);

      console.log(producto)

    return(
        <div style={{
            "border": "2px #ccc solid",
            "width": "20%",
            "height": "20em",
            "border-radius": "2%",
            "padding": "1%",
            "text-align": "center"
        }}>
            <img style={{"width": "40%"}} src={producto[0]["link"]}/>
            <h4>{producto[0]["nombre"]}</h4>
            <p>{producto[0]["descripcion"]}</p>
            <p><b>Q.{producto[0]["precio"]}.00</b></p>
            <Link to={`/showProduct/${producto[0]["id"]}`}>
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