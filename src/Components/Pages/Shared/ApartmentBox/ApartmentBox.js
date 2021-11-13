import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const ApartmentBox = ({ apartment }) => {
    const { _id, name, description, img, price } = apartment;
    return (
        <Grid item xs={12} sm={12} md={6}>
            <Card sx={{ boxShadow: '#3b3b3b82 0px 0px 10px', borderRadius: '15px', padding: '8px', backgroundColor: '#ffffff7a', color: '#323231', border: '1px solid #9bb8b9' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={img}
                    alt="green iguana"
                    sx={{ borderRadius: '15px' }}
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
                    <Link to={`/apartment/book/${_id}`} className="jbutton">Book now</Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ApartmentBox;