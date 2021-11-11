import { Button, Grid } from '@mui/material';
import React from 'react';

const ApartmentBox = ({ apartmentData }) => {
    const { _id, name, img, description, price } = apartmentData;
    const deleteBook = () => {
        fetch(`http://localhost:5000/bookedapartments/delete?id=${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
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
                <Button onClick={deleteBook}>Cancel</Button>
            </Grid>
        </Grid>
    );
};

export default ApartmentBox;