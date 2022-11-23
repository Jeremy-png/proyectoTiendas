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

export default function RegistroTienda() {
  

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);


  React.useEffect(() => {
    axios.get("http://localhost/proyectoTiendas/categoriasTiendas.php")
      .then(response=>{
        console.log(response.data);
        setOptions(response.data);
        
      }).catch(error=>{
        console.log(error);
      });

    
      //console.log("Tienda: "+tienda.id);

    }, []);


  const handleSubmit = (event) => {
    //console.log ('hola');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      nombre: data.get('nombre'),
      longitud: data.get('longitud'),
      latitud: data.get('latitud'),   
      link: data.get('link'),
      telefono: data.get('telefono'),
      descripcion: data.get('descripcion'),
      logotipo: data.get('logotipo'),
      zona: data.get('zona'),
      municipio: data.get('municipio'),
      departamento: data.get('departamento'),
      id_usuario: localStorage.getItem('id_usuario'),
      categorias: selected,
    }

    axios.post('http://localhost/proyectoTiendas/registrotiendas.php', dataEnviar).then(response => console.log(response));
  
    
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
                  id="longitud"
                  label="longitud"
                  name="longitud"
                  autoComplete="Coordenadas"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="latitud"
                label="latitud"
                name="latitud"
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="zona"
              label="Zona"
              type="number"
              id="zona"
              autoComplete="Zona"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="departamento"
              label="Departamento"
              type="text"
              id="departamento"
              autoComplete="departamento"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="municipio"
              label="Municipio"
              type="text"
              id="muinicipio"
              autoComplete="municipio"
            />
          </Grid>
          <Grid item xs={12}>
          <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Seleccionar"
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