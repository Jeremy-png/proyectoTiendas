
import axios from 'axios';
import * as React from 'react';
import ShowProductComponent from '../ShowProductComponent/ShowProductComponent';
import { useState } from 'react';
import CatalogoProductosComponent from '../CatalogoProductosComponent/CatalogoProductosComponent';

export default function ShowProductPage() {

    

    return(
        <div style={{"margin": "4%"}}>
            <CatalogoProductosComponent/>
        </div>
    );
}