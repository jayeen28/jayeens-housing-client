import React from 'react';
import { Button, Grid } from '@mui/material';

const ApartmentBox = ({ apartmentData }) => {
    const { _id, name, img, description, price, bookstatus } = apartmentData;
    const deleteBook = () => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/bookedapartments/delete?id=${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    const updateBookingStatus = () => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/bookedapartments?id=${_id}`, {
            method: 'PUT'
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
                <h4>Booking status:{bookstatus}</h4>
            </Grid>
            <Grid item lg={4}>
                <Button onClick={deleteBook}>Cancel</Button>
                <Button onClick={updateBookingStatus}>Approve</Button>
            </Grid>
        </Grid>
    );
};

export default ApartmentBox;