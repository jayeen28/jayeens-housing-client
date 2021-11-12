import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const MApartmentBox = ({ apartment, render, setrender }) => {
    const { _id, name, img, price, description } = apartment;
    const deleteApartment = () => {
        const deleteres = window.confirm('Are you sure that you want to delete?')
        if (deleteres) {
            fetch(`https://obscure-refuge-52189.herokuapp.com/apartments/delete?id=${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        render ? setrender(false) : setrender(true);
                    }
                    else {
                        alert('Something went wrong!')
                    }
                })
        }
    }
    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card sx={{ boxShadow: '#00000070 0px 0px 8px', borderRadius: '15px', padding: '8px' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={img}
                    alt="green iguana"
                    sx={{ borderRadius: '10px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="p" color="text.secondary">{description.slice(0, 130)}</Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Price: {price}$
                    </Typography>
                </CardContent>
                <CardActions>
                    <button onClick={() => deleteApartment()} className="jbutton">Delete</button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default MApartmentBox;