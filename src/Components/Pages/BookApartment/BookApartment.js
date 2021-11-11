import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, CircularProgress, Container, TextField } from '@mui/material';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Header from '../Shared/Header/Header';

const BookApartment = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isLoading, setisLoading] = useState(true);
    const [apartmentData, setapartmentData] = useState({});
    const [customerData, setcustomerData] = useState({});
    const { handleSubmit, register, setValue } = useForm();

    //GET APARTMENT DATA
    useEffect(() => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/apartment/${id}`)
            .then(res => res.json())
            .then(data => setapartmentData(data));
    }, [id])

    //GET CUSTOMER DATA
    useEffect(() => {
        fetch(` https://obscure-refuge-52189.herokuapp.com/customers?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                setcustomerData(data);
                setisLoading(false);
            })
    }, [user])
    const { name, img, price, description } = apartmentData;

    //SET DEFAULT VALUES
    setValue('customerName', `${user.displayName}`);
    setValue('customerEmail', `${user.email}`);
    if (customerData.phone) {
        setValue('customerPhone', `${customerData.phone}`);
        setValue('customerAddress', `${customerData.address}`)
    }

    //HANDLE BOOK NOW FORM
    const onSubmit = data => {
        //DELETE MONGO IDS TO HANDLE DUPLICATE ERROR
        delete customerData._id;
        delete apartmentData._id

        //SEND CUSTOMER INFO TO DATABSE
        customerData.address = data.customerAddress
        customerData.phone = data.customerPhone;
        fetch(' https://obscure-refuge-52189.herokuapp.com/customers', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
            .then(res => res.json())
            .then(data => console.log(data));
        //SEND ORDER DATA TO DATABSE
        const bookingDate = new Date().toLocaleDateString();
        const bookingTime = new Date().toLocaleTimeString();
        const bookedBy = user.uid;
        const bookingInfo = { bookingDate, bookingTime, bookedBy };
        apartmentData.bookingInfo = bookingInfo;
        fetch(' https://obscure-refuge-52189.herokuapp.com/apartment/book', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(apartmentData)
        })
            .then(res => res.json())
            .then(data => console.log(data))
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
                        {isLoading ?
                            <div className="spinner" style={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </div>
                            :
                            <div className="book-now-form">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                        label="Your Name"
                                        className="jayeen-input"
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
                                        defaultValue=""
                                    />
                                    <TextField
                                        label="Your address"
                                        type="text"
                                        variant="standard"
                                        {...register('customerAddress')}
                                        defaultValue=""
                                    />
                                    <Button type="submit" variant="contained">Book now</Button>
                                </form>
                            </div>
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default BookApartment;