import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LoginContext } from '../../context/contexto';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './../SignIn/signin.css';
import emailjs from '@emailjs/browser';



import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignIn() {

    const{
        username, setUsername, setTipoUsuario, tipoUsuario
    } = useContext(LoginContext);

    const history = useHistory();

    const [open, setOpen]=useState(false);
    const [correo, setCorreo]=useState('');


    
  const  handleRest = (event) =>{
    emailjs.send("service_anoqq7g","template_dkcgv38",{
      to_name: correo,
      reply_to: "caceres191453@unis.edu.gt",
    },"NZQzHmJIncXZui78F");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    
    let dataEnviar = new FormData();
    dataEnviar.append('correo', data.get('email'));
    dataEnviar.append('contrasena', data.get('password'));

    axios.post('http://localhost/proyectoTiendas/signIn.php', dataEnviar)
    .then(function (response) {
      console.log(response);
      console.log(response.data.id_tipousuario);
      setUsername (data.get('email'));
      setTipoUsuario(response.data.id_tipousuario);
      localStorage.setItem('id_usuario',response.data.id);
      history.push("/home");
  })
  .catch(function (response) {

  });


  axios.get('http://localhost/proyectoTiendas/getTiendaUsuario.php?correo='+data.get('email'))
  .then(response=>{
   
    localStorage.setItem('tienda', response.data.tienda);
    
  }).catch(error=>{
    console.log(error);
  });
  

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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' onClick={e=>setOpen(true)}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              
            </Grid>
            <div  id={open?"yes":"not"}>
                <TextField
                onChange={e=>setCorreo(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="new-email"
                label="Email Address"
                name="new-email"
                autoComplete="email"
                autoFocus
              />
               <Button
              onClick={handleRest}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Restablecer Contraseña
            </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}