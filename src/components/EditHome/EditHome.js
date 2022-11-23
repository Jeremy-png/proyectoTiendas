import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import EditBoxHome from "../EditBoxHome/EditBoxHome";
import axios from "axios";

export default function EditHome() {
  const handleSubmitInfo = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      title: data.get('title'),
      body: data.get('body'),
    };
   console.log(dataEnviar); 

   const url = "http://localhost/proyectoTiendas/cargaMasiva.php";
       
        axios.post(url, dataEnviar)
        .then((response)=> {
            console.log(response);
           
        })
        .catch((response)=> {
            console.log(response);
        });
  };

  const handleSubmitIMG = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      img1: data.get('img1'),
      img2: data.get('img2'),
      img3: data.get('img3'),
      img4: data.get('img4'),
      img5: data.get('img5'),
    };
   console.log(dataEnviar); 
  };
    return(
        <div>
        <div style={{
            "display" : "flex",
        }}>
            <Box component="form" onSubmit={handleSubmitInfo} noValidate  sx={{ mt: 3 }} style={{
                "padding":"2%",
                "border":"2px #CCC solid",
                "border-radius": "5px",
                "width": "40%",
                "margin": "2%"
            }}>
                <Typography gutterBottom variant="h4" component="div"> Informacion Principal</Typography>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"/>
                <TextField
                  fullWidth
                  name="body"
                  label="Body"/>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
            </Box>

            
          
        </div>
        <div style={{
          "margin": "2%",
          "display": "flex"
        }}>
          <EditBoxHome 
          titleBox="1"
          title= "title1"
          body="body1"
          img="img1"
          / >
          <EditBoxHome 
          titleBox="2"
          title= "title2"
          body="body2"
          img="img2"
          / >
          <EditBoxHome 
          titleBox="3"
          title= "title3"
          body="body3"
          img="img3"
          / >
          <EditBoxHome 
          titleBox="4"
          title= "title4"
          body="body4"
          img="img4"
          / >
          <EditBoxHome 
          titleBox="5"
          title= "title5"
          body="body5"
          img="img5"
          / >
        </div>
        </div>
    );
}