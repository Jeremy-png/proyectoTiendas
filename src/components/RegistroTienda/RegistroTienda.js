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


const theme = createTheme();

export default function RegistroTienda() {

  const handleSubmit = (event) => {
    //console.log ('hola');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      nombre: data.get('nombre'),
      coordenadas: data.get('ubicacion'),  
      link: data.get('link'),
      telefono: data.get('telefono'),
      descripcion: data.get('descripcion'),
      logotipo: data.get('logotipo'),
      id_usuario: localStorage.getItem('id_usuario'),
    }
    axios({
      method: 'post',
      url: 'http://localhost/proyectoTiendas/registrotiendas.php',
      data: dataEnviar
    })
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
            Registro Tiendas
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ubicacion"
                  label="longitud"
                  name="ubicacion"
                  autoComplete="Coordenadas"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="ubicacion"
                label="latitud"
                name="ubicacion"
                autoComplete="Coordenadas"
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="descripcion"
                  label="Descripcion"
                  name="descripcion"
                  autoComplete="descripcion"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="link"
                  label="Link"
                  type="link"
                  id="link"
                  autoComplete="link"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="telefono"
                label="Telefono"
                type="number"
                id="telefono"
                autoComplete="00000000"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="logotipo"
              label="Logotipo"
              type="text"
              id="logotipo"
              autoComplete="logotipo"
            />
          </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar Tienda
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}