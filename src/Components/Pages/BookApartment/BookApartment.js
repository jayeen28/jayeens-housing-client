import React, { useEffect, useState } from 'react';
import './BookApartment.css';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Header from '../Shared/Header/Header';
import BookApartmentForm from './BookApartmentForm/BookApartmentForm';
import Footer from '../Shared/Footer/Footer';

const BookApartment = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isLoading, setisLoading] = useState(true);
    const [apartmentData, setapartmentData] = useState({});
    const [customerData, setcustomerData] = useState({});

    //GET APARTMENT DATA
    useEffect(() => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/apartment/${id}`)
            .then(res => res.json())
            .then(data => setapartmentData(data));
    }, [id])

    //GET CUSTOMER DATA
    useEffect(() => {
        fetch(` https://obscure-refuge-52189.herokuapp.com/users?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                setcustomerData(data);
                setisLoading(false);
            })
    }, [user])
    const { name, img, price, description } = apartmentData;

    return (
        <div className="book-apartment-page">
            <Header />
            <Container>
                <Grid container spacing={4} sx={{ marginTop: '10px' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="bookapartment-info">
                            <div className="bookapartment-img">
                                <img src={img} alt="bookapartmentIamge" style={{ width: '100%' }} />
                            </div>
                            <div className="bookapartment-name">
                                <h2>{name}</h2>
                            </div>
                            <div className="bookapartment-desc">
                                <p>
                                    {description}
                                </p>
                            </div>
                            <div className="bookapartment-price">
                                <h5>Price: {price}$</h5>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <BookApartmentForm isLoading={isLoading} customerData={customerData} apartmentData={apartmentData} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default BookApartment;