import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from '@mui/material';

export default function FechaComponent(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataEnviar = {
          date1: data.get('date1'),
          date2: data.get('date2'),  

        }
        console.log(dataEnviar);


            axios.get("http://localhost/proyectoTiendas/tiendasXFechas.php?date1=" + dataEnviar.date1+"&date2="+dataEnviar.date2)
              .then(response=>{
                console.log(response.data);
                console.log();
              }).catch(error=>{
                console.log(error);
              });
              console.log("http://localhost/proyectoTiendas/tiendasXFecha.php?date1=" + dataEnviar.date1+"date2="+dataEnviar.date2);
        
      };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} style={{"width": "20%"}}>
    <h3>Reportes entre: </h3>  
    <input type="date" name="date1"></input>
      <input type="date" name="date2"></input>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 0 }}
            >
              Generate
            </Button>
            
    </Box>
  );
}