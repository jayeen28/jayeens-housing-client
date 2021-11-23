import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Alert, CircularProgress } from '@mui/material';

const CheckoutForm = ({ price, customerData }) => {
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');
    const [clientSecret, setclientSecret] = useState('');
    const [paymentLoading, setpaymentLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { displayName, email } = customerData;

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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            seterror(error.message);
            setsuccess('');
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        //PAYMENT INTENT
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
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
            console.log(paymentIntent)
            seterror('');
            setsuccess('Your payment processed successfully');
            setpaymentLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
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
            {error.length > 1 || success.length > 1 ? <Alert severity={error.length > 1 ? 'error' : 'success'}>{error || success}</Alert> : ''}

            {paymentLoading ? <CircularProgress size="30px" sx={{ color: '#1D6B6F' }} /> : <button className="jbutton" type="submit" disabled={!stripe} onClick={() => seterror('')}>
                Pay {price}$
            </button>}
        </form>
    );
};

export default CheckoutForm;