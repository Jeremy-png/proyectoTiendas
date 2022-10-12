import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

export default function EditHome() {
    return(
        <div style={{
            "display" : "flex",
        }}>
            <Box component="form" noValidate  sx={{ mt: 3 }} style={{
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

            <Box component="form" noValidate  sx={{ mt: 3 }} style={{
                "padding":"2%",
                "border":"2px #CCC solid",
                "border-radius": "5px",
                "width": "40%",
                "margin": "2%"
            }}>
                <Typography gutterBottom variant="h4" component="div"> Images</Typography>
                <label for="file">Img1: </label><input type="file"/><br/>
                <label for="file">Img2: </label><input type="file"/><br/>
                <label for="file">Img3: </label><input type="file"/><br/>
                <label for="file">Img4: </label><input type="file"/><br/>
                <label for="file">Img5: </label><input type="file"/><br/>
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