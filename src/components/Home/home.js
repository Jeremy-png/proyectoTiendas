import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpeg";
import img3 from "./assets/3.jpg";

import FormControl from '@mui/material/FormControl';

export default class Home extends Component {
    render() {
        return (
            <div>
            
            
            <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
            </Carousel>
            </div>
        );
    }
};