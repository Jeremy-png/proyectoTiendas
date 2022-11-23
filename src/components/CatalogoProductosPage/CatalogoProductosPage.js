import axios from 'axios';
import * as React from 'react';
import ShowProductComponent from '../ShowProductComponent/ShowProductComponent';
import { useState } from 'react';
import CatalogoProductosComponent from '../CatalogoProductosComponent/CatalogoProductosComponent';

export default function CatalogoProductosPage() {

  const [busqueda, setBusqueda]=useState('');  
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

      const getData=(filtro)=>{

        setBusqueda(filtro);
       

        axios.get("http://localhost/proyectoTiendas/buscarProductos.php?filtro="+filtro)
        .then(response=>{
          setProducto(response.data);
          console.log(response.data);
        }).catch(error=>{
          console.log(error);
          
        });
        console.log(producto);

     }

    return(
        <div style={{"margin": "4%"}}>
           <h3>Buscar Productos:</h3>
           <input style={{"margin-bottom": "4%", "width": "90%", "padding": "8px"}} type="text" placeholder='Buscar' onChange={e=>getData(e.target.value)}/>
           <br/>
        {producto.map((ro) => (
            <CatalogoProductosComponent key={ro.id} nombre={ro.nombre} descripcion={ro.descripcion} categorias={ro.categorias} precio={ro.precio} link={ro.link} id={ro.id}/>
        ))}
        </div>
    );
}