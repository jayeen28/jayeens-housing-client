import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Container, TextField } from '@mui/material';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Header from '../Shared/Header/Header';

const BookApartment = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [apartmentData, setapartmentData] = useState({});
    const { handleSubmit, reset, register, setValue } = useForm();

    //GET APARTMENT DATA
    useEffect(() => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/apartment/${id}`)
            .then(res => res.json())
            .then(data => setapartmentData(data));
    }, [id])
    const { name, img, price, description } = apartmentData;

    //SET DEFAULT VALUES
    setValue('customerName', `${user.displayName}`)
    setValue('customerEmail', `${user.email}`)
    //HANDLE BOOK NOW FORM
    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div className="book-apartment-page">
            <Header />
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="apartment-info">
                            <div className="apartment-name">
                                <h2>{name}</h2>
                            </div>
                            <div className="apartment-img">
                                <img src={img} alt="apartmentIamge" />
                            </div>
                            <div className="apartment-desc">
                                <p>
                                    {description}
                                </p>
                            </div>
                            <div className="apartment-price">
                                <h5>Price: {price}</h5>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="book-now-form">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    label="Your Name"
                                    type="text"
                                    variant="standard"
                                    {...register('customerName')}
                                />
                                <TextField
                                    label="Your email"
                                    type="email"
                                    variant="standard"
                                    {...register('customerEmail')}
                                />
                                <TextField
                                    label="Your Phone"
                                    type="tel"
                                    variant="standard"
                                    {...register('customerPhone')}
                                />
                                <TextField
                                    label="Your address"
                                    type="text"
                                    variant="standard"
                                    {...register('customerAddress')}
                                />
                                <Button type="submit" variant="contained">Book now</Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default BookApartment;