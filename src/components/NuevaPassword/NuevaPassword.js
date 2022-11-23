import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { MultiSelect } from "react-multi-select-component";


const theme = createTheme();

export default function Restablecer() {
  

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);


  React.useEffect(() => {
    

    
      //console.log("Tienda: "+tienda.id);

    }, []);


  const handleSubmit = (event) => {
    //console.log ('hola');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      password: data.get('password'),
      email: data.get('email'),
    }

    axios.post('http://localhost/proyectoTiendas/restablecer.php', dataEnviar).then(response => console.log(response));
  
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Restablecer Contraseña
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Contraseña Nueva"
                  name="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               Restablecer Contraseña
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}