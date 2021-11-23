import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Alert, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useHistory } from 'react-router';

const CheckoutForm = ({ apartmentData, customerData }) => {
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');
    const [clientSecret, setclientSecret] = useState('');
    const [paymentLoading, setpaymentLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { _id, name, price } = apartmentData;
    const { displayName, email, phone, address } = customerData;
    const history = useHistory();

    useEffect(() => {
        fetch('https://afternoon-earth-46164.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setclientSecret(data.clientSecret))
    }, [price])
    const handleSubmit = async (e) => {
        setpaymentLoading(true);
        e.preventDefault();

        //RETURN IF STRIPE OR ELEMENTS IS FALSY
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            seterror(error.message);
            setsuccess('');
        }

        //PAYMENT INTENT
        const { error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: displayName,
                        email: email
                    }
                }
            }
        );
        if (intentError) {
            seterror(intentError.message);
            setsuccess('');
            setpaymentLoading(false);
        }
        else {
            seterror('');
            setsuccess('Your payment request is successfull.');

            //SEND TO DB
            fetch(`https://afternoon-earth-46164.herokuapp.com/bookedapartments?id=${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ status: 'Processing' })
            })
                .then(res => res.json())
                .then(({ modifiedCount }) => {
                    if (modifiedCount > 0) {
                        setpaymentLoading(false)
                        history.push('/thankyou');
                    }
                    else {
                        seterror('Your payment is done but unfortunately it is not updated to our database. It could be your internet issue. Please contact us here jayeenb@gmail.com');
                    }
                })
        }
    };

    return (
        <div className="checkout-page">
            <div className="checkout-customer-info">
                <h2>Your informations</h2>
                <h4>
                    <span style={{ color: '#3D777A', fontWeight: 'bold' }}>Your name: </span>{displayName}
                </h4>
                <h4>
                    <span style={{ color: '#3D777A', fontWeight: 'bold' }}>Your email: </span>{email}
                </h4>
                <h4>
                    <span style={{ color: '#3D777A', fontWeight: 'bold' }}>Your phone: </span>{phone}
                </h4>
                <h4>
                    <span style={{ color: '#3D777A', fontWeight: 'bold' }}>Your address: </span>{address}
                </h4>
            </div>
            <div className="apartment-informations">
                <h2>Apartment informations</h2>
                <TableContainer sx={{ overflowX: 'hidden' }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 1, borderColor: '#CDD5E2' } }}
                            >
                                <TableCell align="left"><h3 style={{ color: '#3D777A', fontWeight: 'bold', margin: '5px' }}>Name</h3></TableCell>
                                <TableCell align="left"><h4 style={{ margin: '5px' }}>{name}</h4></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left"><h3 style={{ color: '#3D777A', fontWeight: 'bold', margin: '5px' }}>Price</h3></TableCell>
                                <TableCell align="left"><h4 style={{ margin: '5px' }}>{price}</h4></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Your card information</h2>
                <div className="card-input" style={{ marginTop: '15px', marginBottom: '20px' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                {error.length > 1 || success.length > 1 ? <Alert severity={error.length > 1 ? 'error' : 'success'}>{error || success}</Alert> : ''}

                {paymentLoading ? <CircularProgress size="30px" sx={{ color: '#1D6B6F' }} /> : <button className="jbutton" type="submit" disabled={!stripe} onClick={() => seterror('')}>
                    Pay {price}$
                </button>}
            </form>
        </div >
    );
};

export default CheckoutForm;