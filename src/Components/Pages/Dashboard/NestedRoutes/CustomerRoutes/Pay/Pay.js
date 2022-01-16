import { Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';
import './Pay.css';

const stripePromise = loadStripe('pk_test_51Jw3qQIWvMhhAaYpLP7xvJOml4vmmODu1zQIv0zgcoucUX8H1aGrfagBGwBWFHdSaeox3MFMyPEHLW1BtjDHuTYM00FKIPjjFk');

const Pay = () => {
    const { id } = useParams();
    const [isLoading, setisLoading] = useState(true);
    const [apartmentData, setapartmentData] = useState({});
    const [customerData, setCustomerData] = useState(null);
    const { price, bookingInfo } = apartmentData;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}apartments/booked/${id}`)
            .then(res => res.json())
            .then(data => {
                setapartmentData(data);
                setisLoading(false);
            });
    }, [id]);

    //GET CUSTOMER INFO
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}users?uid=${bookingInfo?.bookedBy}`)
            .then(res => res.json())
            .then(data => setCustomerData(data));
    }, [bookingInfo?.bookedBy])

    if (isLoading) { return 'LOADING CONTENTS . . . .' };
    return (
        <div className="payment-page-wrapper" style={{ textAlign: 'left' }}>
            <Container>
                <h2 className="jsectionhead">Billing details</h2>
                {price && customerData ? <Elements stripe={stripePromise}>
                    <CheckoutForm apartmentData={apartmentData} customerData={customerData} />
                </Elements>
                    : 'LOADING CHECKOUT FORM. . . . '
                }
            </Container>
        </div>
    );
};

export default Pay;