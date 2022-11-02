import axios from 'axios';
import * as React from 'react';
import TiendasCard from './TiendasCard';
import { useState } from 'react';

export default function CatalogoTiendas() {

    const [tienda, setTienda]=useState([[]]);
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/tiendas.php")
        .then(response=>{
          console.log(response.data);
          setTienda(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(tienda);

      }, []);
    

    return(
        <div style={{"margin": "4%"}}>
            {tienda.map((ro) => (
                <TiendasCard key={ro.id} logo={ro.foto_logo} nombre={ro.nombre} telefono={ro.telefono} descripcion={ro.descripcion} id={ro.id}/>
            ))}
        </div>
    );
}