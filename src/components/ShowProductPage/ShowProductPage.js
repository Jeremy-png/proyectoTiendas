import axios from 'axios';
import * as React from 'react';
import ShowProductComponent from '../ShowProductComponent/ShowProductComponent';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../../comments/comments';
import BasicRating from '../Rating/Rating';

export default function ShowProductPage() {

  const {id}= useParams()

    const [producto, setProducto]=useState([[]]);
    const [imgs, setImgs]=useState([[]]);
    React.useEffect(() => {
      axios.get("http://localhost/proyectoTiendas/productos_aprobados.php?id="+id)
        .then(response=>{
          console.log(response.data);
          console.log(id);
          setProducto(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(producto);

        axios.get("http://localhost/proyectoTiendas/imgs_prod.php?id="+id)
        .then(response=>{
          console.log(id);
          setImgs(response.data);
          console.log(response.data);
          
        }).catch(error=>{
          console.log(error);
        });
        console.log(imgs);

      }, []);

      console.log(producto)

    return(
        <div>
            <ShowProductComponent 
            title={producto.nombre}
            img={producto.link}

            category={producto.nombre_categoria}
            price={producto.precio}
            description={producto.descripcion}

            img2={producto.link1}
            img3={producto.link2}
            />

           <Comments tienda={0} id={id} />
          <BasicRating 
          userID={localStorage.getItem('id_usuario')}
          itemID={useParams().id}
          URL="http://localhost/proyectoTiendas/ratingProducto.php"
          />
        </div>
    );
}