import { Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Jw3qQIWvMhhAaYpLP7xvJOml4vmmODu1zQIv0zgcoucUX8H1aGrfagBGwBWFHdSaeox3MFMyPEHLW1BtjDHuTYM00FKIPjjFk');

const Pay = () => {
    const { id } = useParams();
    const [isLoading, setisLoading] = useState(true);
    const [apartmentData, setapartmentData] = useState({});
    const [customerData, setCustomerData] = useState(null);
    const { price, bookingInfo } = apartmentData;

    useEffect(() => {
        fetch(`https://afternoon-earth-46164.herokuapp.com/apartments/booked/${id}`)
            .then(res => res.json())
            .then(data => {
                setapartmentData(data);
                setisLoading(false);
            });
    }, [id]);

    //GET CUSTOMER INFO
    useEffect(() => {
        fetch(`https://afternoon-earth-46164.herokuapp.com/users?uid=${bookingInfo?.bookedBy}`)
            .then(res => res.json())
            .then(data => setCustomerData(data));
    }, [bookingInfo?.bookedBy])

    if (isLoading) { return 'LOADING CONTENTS . . . .' };
    return (
        <Container>
            <h2 className="jsectionhead">Pay for {id}</h2>
            {price && customerData ? <Elements stripe={stripePromise}>
                <CheckoutForm apartmentData={apartmentData} customerData={customerData} />
            </Elements>
                : 'LOADING CHECKOUT FORM. . . . '
            }
        </Container>
    );
};

export default Pay;