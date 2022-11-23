import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpeg";
import img3 from "./assets/3.jpg";

import FormControl from '@mui/material/FormControl';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import HomeBox from '../HomeBox/HomeBox';
import InfoBox from './InfoBox/InfoBox';
import CargaMasiva from '../CargaMasiva/CargaMasiva';




const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const dataEnviar = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),  
    correo: data.get('email'),
    message: data.get('message'),
  }
  console.log(dataEnviar);
  axios({
    method: 'post',
    url: 'http://localhost/proyectoTiendas/signUp.php',
    data: dataEnviar
  })
};

  //Informacion principal
  var boxInfo= {
    title: "Information",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }


  //Tarjetas de informacion
  var homeBox = {
    title: "Lizard",
    body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    img: "/static/images/cards/contemplative-reptile.jpg"
  }

  var homeBox2 = {
    title: "Lizard",
    body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    img: "/static/images/cards/contemplative-reptile.jpg"
  }
  var homeBox3 = {
    title: "Lizard",
    body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    img: "/static/images/cards/contemplative-reptile.jpg"
  }
  var homeBox4 = {
    title: "Lizard",
    body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    img: "/static/images/cards/contemplative-reptile.jpg"
  }
  var homeBox5 = {
    title: "Lizard",
    body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    img: "/static/images/cards/contemplative-reptile.jpg"
  }

export default function Home () {

  const [datos, setDatos] = React.useState([[]]);
  const [tiendas, setTiendas] = React.useState([[]]);
  const [prods, setProds] = React.useState([[]]);
  const [box1, setBox1] = React.useState([]);
  const [box2, setBox2] = React.useState([]);
  const [box3, setBox3] = React.useState([]);
  const [box4, setBox4] = React.useState([]);
  const [box5, setBox5] = React.useState([]);
  
  React.useEffect(() => {
    axios.get("http://localhost/proyectoTiendas/homepage.php")
    .then(response=>{
      setDatos(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

    axios.get("http://localhost/proyectoTiendas/cincoTiendas.php")
    .then(response=>{
      setTiendas(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

    axios.get("http://localhost/proyectoTiendas/getProductosNuevos.php")
    .then(response=>{
      setProds(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });


    axios.get("http://localhost/proyectoTiendas/homeBox.php?id=1")
    .then(response=>{
      setBox1(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

    axios.get("http://localhost/proyectoTiendas/homeBox.php?id=2")
    .then(response=>{
      setBox2(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

    axios.get("http://localhost/proyectoTiendas/homeBox.php?id=3")
    .then(response=>{
      setBox3(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

    axios.get("http://localhost/proyectoTiendas/homeBox.php?id=4")
    .then(response=>{
      setBox4(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

    axios.get("http://localhost/proyectoTiendas/homeBox.php?id=5")
    .then(response=>{
      setBox5(response.data);
      console.log(datos);
      
    }).catch(error=>{
      console.log(error);
    });

  }, []);

    
        return (
            <div style={{
                padding: "1% 5%",
            }}>
            <h3>Nuestras Mejores Tiendas</h3>
            <Carousel>
            {tiendas.map((ro) => (
                <div>
                    <img src={ro.foto_logo} />
                </div>
              ))}
            </Carousel>

            <h3>Nuestros Productos Más Nuevos</h3>
            <Carousel>
            {prods.map((ro) => (
                <div>
                    <img src={ro.link} />
                </div>
              ))}
            </Carousel>


            <InfoBox 
                title= {datos[0].titulo}
                body= {datos[0].contenido}
            />
            <div style={{
                display: "flex"
            }}>
                <HomeBox 
                title={box1.titulo}
                body={box1.cuerpo}
                img={box1.link}
                />

                <HomeBox 
                title={box2.titulo}
                body={box2.cuerpo}
                img={box2.link}
                />

                <HomeBox 
                title={box3.titulo}
                body={box3.cuerpo}
                img={box3.link}
                />

                <HomeBox 
                title={box4.titulo}
                body={box4.cuerpo}
                img={box4.link}
                />

                <HomeBox 
                title={box5.titulo}
                body={box5.cuerpo}
                img={box5.link}
                />
                
 
            </div>
            
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography gutterBottom variant="h5" component="div">
                Contact Us!
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="message"
                  label="Message"
                  type="text"
                  id="message"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Message
            </Button>
          </Box>
        
            </div>
        );

};