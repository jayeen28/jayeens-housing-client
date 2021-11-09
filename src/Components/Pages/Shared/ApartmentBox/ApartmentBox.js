import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const ApartmentBox = ({ apartment }) => {
    const { name, description, img, price } = apartment;
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
                    <Button size="small">Book now</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ApartmentBox;