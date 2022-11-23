import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";

export default function EditBoxHome(props) {
  
    const [titulo, setTitulo]=useState("");
    const [cuerpo, setCuerpo]=useState("");
    const [link, setLink]=useState("");


    const handleSubmitBox = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataEnviar = {
          titulo: titulo,
          cuerpo: cuerpo,
          link: link,
          id: props.titleBox
          
        };

       const url = "http://localhost/proyectoTiendas/editHomeBox.php";
       
        axios.post(url, dataEnviar)
        .then((response)=> {
            console.log(response);
           
        })
        .catch((response)=> {
            console.log(response);
        });

       console.log(dataEnviar); 
      };

    return(
        <div style={{
            "border" : "2px #ccc solid",
            "border-radius": "5px",
            "width" : "15%",
            "padding": "0.5% 2%"
        }}>
        <Box component="form" onSubmit={handleSubmitBox} noValidate  sx={{ mt: 3 }}>
        <h4>Box {props.titleBox}</h4>
            <TextField
                  autoComplete="given-name"
                  name={props.title}
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  onChange={e=>setTitulo(e.target.value)}
                />
                <TextField
                  autoComplete="given-name"
                  name={props.body}
                  fullWidth
                  id="body"
                  label="Body"
                  autoFocus
                  onChange={e=>setCuerpo(e.target.value)}
                />
                <TextField
                  autoComplete="given-name"
                  name={props.img}
                  fullWidth
                  id="img"
                  label="Img"
                  autoFocus
                  onChange={e=>setLink(e.target.value)}
                />
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
    );
}