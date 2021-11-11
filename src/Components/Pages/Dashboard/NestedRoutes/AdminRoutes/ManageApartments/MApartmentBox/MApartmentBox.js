import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const MApartmentBox = ({ apartment }) => {
    const { _id, name, img, price, description } = apartment;
    const deleteApartment = () => {
        fetch(`http://localhost:5000/apartments/delete?id=${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={deleteApartment}>Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default MApartmentBox;