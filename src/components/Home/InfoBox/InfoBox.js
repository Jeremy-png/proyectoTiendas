import { Typography } from "@mui/material";
import React from "react";

export default function InfoBox(props) {

    return(
        <div style={{
            "border": "3px #CCC solid",
            "height": "200px",
            "margin": "2%",
            "border-radius": "10px",
            "padding": "1.5%",
            "text-align" : "justify"
        }}>
        <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
      <p>
        {props.body}
      </p>

        </div>
    );
    
}
