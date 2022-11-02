import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from '@mui/material';

export default function BasicRating(props) {
  const [value, setValue] = React.useState();
  const [rankingCreado, setRankingCreado] = React.useState();

  console.log(value);


  const addRating = () => {
    const dataEnviar = {
        userID: props.userID,
        itemID: props.itemID,
        rating: value
      };
      

  axios.post(props.URL,dataEnviar).then(response => 
    {if(response.data!==1){
        setRankingCreado(true);
    }else{
        alert("Rating registrado");
    }}
  );
  
  }
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Puntuacion</Typography>
     {rankingCreado ? <p style={{color: "red"}}>Usted ya realizo un ranking a este producto!</p> : null}
      <Rating
        name="simple-controlled"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Button onClick={addRating}>Valorar</Button>
      
    </Box>
  );
}
