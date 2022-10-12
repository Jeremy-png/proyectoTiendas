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

export default class Home extends Component {


    
    render() {
        return (
            <div style={{
                padding: "1% 5%",
            }}>
            
            
            <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
            </Carousel>

            <InfoBox 
                title= {boxInfo["title"]}
                body= {boxInfo["body"]}
            />
            <div style={{
                display: "flex"
            }}>
                <HomeBox 
                title={homeBox['title']}
                body={homeBox['body']}
                img={homeBox['img']}
                />

                <HomeBox 
                title={homeBox2['title']}
                body={homeBox2['body']}
                img={homeBox2['img']}
                />

                <HomeBox 
                title={homeBox3['title']}
                body={homeBox3['body']}
                img={homeBox3['img']}
                />

                <HomeBox 
                title={homeBox4['title']}
                body={homeBox4['body']}
                img={homeBox4['img']}
                />

                <HomeBox 
                title={homeBox5['title']}
                body={homeBox5['body']}
                img={homeBox5['img']}
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
    }
};