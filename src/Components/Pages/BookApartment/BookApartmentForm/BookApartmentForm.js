import React, { useState } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';

const BookApartmentForm = ({ isLoading, customerData, apartmentData }) => {
    const { handleSubmit, register, setValue } = useForm();
    const { user } = useAuth();
    const [isloading, setisloading] = useState(false);

    //SET DEFAULT VALUES
    setValue('customerName', `${user.displayName}`);
    setValue('customerEmail', `${user.email}`);
    if (customerData.phone) {
        setValue('customerPhone', `${customerData.phone}`);
        setValue('customerAddress', `${customerData.address}`)
    }

    //HANDLE BOOK NOW FORM
    const onSubmit = data => {
        setisloading(true);
        //DELETE MONGO IDS TO HANDLE DUPLICATE ERROR
        delete customerData._id;
        delete apartmentData._id

        //SEND CUSTOMER INFO TO DATABSE
        customerData.address = data.customerAddress
        customerData.phone = data.customerPhone;
        fetch('https://obscure-refuge-52189.herokuapp.com/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })

        //SEND ORDER DATA TO DATABSE
        const bookingDate = new Date().toLocaleDateString();
        const bookingTime = new Date().toLocaleTimeString();
        const bookedBy = user.uid;
        const bookingInfo = { bookingDate, bookingTime, bookedBy };
        apartmentData.bookingInfo = bookingInfo;
        apartmentData.bookstatus = 'pending';
        fetch(' https://obscure-refuge-52189.herokuapp.com/apartment/book', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(apartmentData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Your booking has placed. We will contact you very soon');
                    setisloading(false);
                } else {
                    alert('Something went wrong');
                }
            })
    }
    return (
        <>
            {isLoading ?
                <div className="spinner" style={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ color: '#3D777A' }} />
                </div>
                :
                <div className="book-now-form-wrapper">
                    <div className="bookapartment-name">
                        <h2>Fill up your details</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="book-now-form">
                        <TextField
                            label="Your name"
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
                        <TextField
                            label="Total family members?"
                            type="number"
                            variant="standard"
                            {...register('customerFamilymember')}
                            defaultValue=""
                        />
                        <button className="jbutton" type="submit" variant="contained">
                            {
                                isloading ? <CircularProgress size={16} sx={{ color: 'white' }} /> :
                                    ''
                            } Place booking
                        </button>
                    </form>
                </div>
            }
        </>
    );
};

export default BookApartmentForm;