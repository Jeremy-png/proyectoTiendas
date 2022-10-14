import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

export default function EditBoxHome(props) {

    const handleSubmitBox = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataEnviar = {
          title: data.get(props.title),
          body: data.get(props.body),
          img: data.get(props.img),
        };
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
                />
                <TextField
                  autoComplete="given-name"
                  name={props.body}
                  fullWidth
                  id="body"
                  label="Body"
                  autoFocus
                />
                <TextField
                  autoComplete="given-name"
                  name={props.img}
                  fullWidth
                  id="img"
                  label="Img"
                  autoFocus
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