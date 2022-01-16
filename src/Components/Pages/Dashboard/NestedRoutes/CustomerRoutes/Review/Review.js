import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Rating } from '@mui/material';
import useAuth from '../../../../../Hooks/useAuth';
import useSwal from '../../../../../Hooks/useSwal.js';
import './Review.css';

const Review = () => {
    const { postSwal } = useSwal();
    const { user } = useAuth();
    const [rating, setrating] = useState(0);
    const { register, handleSubmit, setValue, reset } = useForm();
    setValue('name', `${user.displayName}`);
    setValue('email', `${user.email}`);
    const onSubmit = data => {
        data.reviewedBy = user.email;
        data.rating = rating;
        const url = `${process.env.REACT_APP_SERVER_URL}reviews/add`;
        const formData = data;
        const successTitle = 'Your review has been submitted';
        const errorTitle = 'Something went wrong!';
        postSwal(url, formData, successTitle, errorTitle, reset);
    }
    return (
        <div>
            <h2 className="jsectionhead">Please give us a review</h2>
            <div className="add-review-form">
                <form onSubmit={handleSubmit(onSubmit)} className="review-form">
                    <TextField label="Your name" variant="outlined" {...register('name')} required />
                    <TextField label="Your email" variant="outlined" {...register('email')} required />
                    <TextField
                        label="Your review"
                        rows={4}
                        {...register('review')}
                        multiline
                        required
                    />
                    <div className="rating-wrapper">
                        <span className="rating-text-wrapper">
                            <p className="rating-text">Experience?</p>
                        </span>
                        <Rating
                            name="simple-controlled"
                            onChange={(event, newValue) => {
                                setrating(newValue);
                            }}
                        />
                    </div>
                    <button type="submit" className="jbutton">Post</button>
                </form>
            </div>
        </div>
    );
};

export default Review;