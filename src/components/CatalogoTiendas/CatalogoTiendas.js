import axios from 'axios';
import * as React from 'react';
import TiendasCard from './TiendasCard';
import { useState } from 'react';

export default function CatalogoTiendas() {

    const [busqueda, setBusqueda]=useState('');  
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
    
      const getData=(filtro)=>{

        setBusqueda(filtro);
       

        axios.get("http://localhost/proyectoTiendas/buscarTiendas.php?filtro="+filtro)
        .then(response=>{
          setTienda(response.data);
          console.log(response.data);
        }).catch(error=>{
          console.log(error);
          
        });
        console.log(tienda);

     }



    return(
        <div style={{"margin": "4%"}}>
          <h3>Buscar Tiendas:</h3>
           <input style={{"margin-bottom": "4%", "width": "90%", "padding": "8px"}} type="text" placeholder='Buscar' onChange={e=>getData(e.target.value)}/>
           <br/>
            {tienda.map((ro) => (
                <TiendasCard key={ro.id} logo={ro.foto_logo} nombre={ro.nombre} telefono={ro.telefono} descripcion={ro.descripcion} id={ro.id}/>
            ))}
        </div>
    );
}