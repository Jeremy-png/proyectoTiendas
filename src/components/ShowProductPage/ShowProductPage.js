
import axios from 'axios';
import * as React from 'react';
import ShowProductComponent from '../ShowProductComponent/ShowProductComponent';
import { useState } from 'react';

export default function ShowProductPage() {

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
        <div>
            <ShowProductComponent 
            title={producto[0]["nombre"]}
            img={producto[0]["link"]}

            category={producto[0]["nombre_categoria"]}
            price={producto[0]["precio"]}
            description={producto[0]["descripcion"]}
            />
        </div>
    );
}