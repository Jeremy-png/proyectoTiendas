import axios from 'axios';
import * as React from 'react';
import ShowProductComponent from '../ShowProductComponent/ShowProductComponent';
import { useState } from 'react';
import CatalogoProductosComponent from '../CatalogoProductosComponent/CatalogoProductosComponent';

export default function CatalogoProductosPage() {

    const [producto, setProducto]=useState([[]]);
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/getProductosAprobados.php")
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
        <div style={{"margin": "4%"}}>
        {producto.map((ro) => (
            <CatalogoProductosComponent key={ro.id} nombre={ro.nombre} descripcion={ro.descripcion} categorias={ro.categorias} precio={ro.precio} link={ro.link} id={ro.id}/>
        ))}
        </div>
    );
}