import { Grid } from '@mui/material';
import React from 'react';

const ApartmentBox = ({ apartmentData }) => {
    const { name, img, description, price } = apartmentData;
    return (
        <Grid container sx={{ border: '1px solid red', margin: '20px 10px' }}>
            <Grid item lg={4}>
                <img src={img} alt="apartmentImage" style={{ width: '100%' }} />
                <h2>{name}</h2>
            </Grid>
            <Grid item lg={4}>
                <p>{description}</p>
                <h4>Price: {price}</h4>
            </Grid>
            <Grid item lg={4}>
                hello
            </Grid>
        </Grid>
    );
};

export default ApartmentBox;