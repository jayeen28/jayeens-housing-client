import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CircularProgress } from '@mui/material';
import './CheckoutForm.css';
import { useHistory } from 'react-router';
import useSwal from '../../../../../Hooks/useSwal';

const CheckoutForm = ({ apartmentData, customerData }) => {
    const { openSwal } = useSwal();
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
        fetch(`${process.env.REACT_APP_SERVER_URL}create-payment-intent`, {
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
            fetch(`${process.env.REACT_APP_SERVER_URL}bookedapartments?id=${_id}`, {
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
        <div className="checkout-section">
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
            <hr />
            <div className="apartment-informations">
                <h2>Apartment informations</h2>
                <table className="apartmentinfo-table">
                    <tbody>
                        <tr>
                            <td>
                                <h4 style={{ color: '#3D777A', fontWeight: 'bold', margin: '5px' }}>Name:</h4>
                            </td>
                            <td>
                                <h4 style={{ margin: '5px' }}>{name}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4 style={{ color: '#3D777A', fontWeight: 'bold', margin: '5px' }}>Price:</h4>
                            </td>
                            <td>
                                <h4 style={{ margin: '5px' }}>{price}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                {
                    error.length > 1 || success.length > 1 ? error.length > 1 ? openSwal(error, 'warning') : openSwal(success, 'success') : ''
                }

                {paymentLoading ? <CircularProgress size="30px" sx={{ color: '#1D6B6F' }} /> : <button className="jbutton" type="submit" disabled={!stripe} onClick={() => seterror('')}>
                    Pay {price}$
                </button>}
            </form>
        </div>
    );
};

export default CheckoutForm;