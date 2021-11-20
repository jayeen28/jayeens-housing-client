import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Rating } from '@mui/material';
import useAuth from '../../../../../Hooks/useAuth';
import './Review.css';

const Review = () => {
    const { user } = useAuth();
    const [rating, setrating] = useState(0);
    const { register, handleSubmit, setValue, reset } = useForm();
    setValue('name', `${user.displayName}`);
    setValue('email', `${user.email}`);
    const onSubmit = data => {
        data.reviewedBy = user.email;
        data.rating = rating;
        fetch('https://afternoon-earth-46164.herokuapp.com/reviews/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Your review has been submitted');
                    reset();
                }
                else {
                    alert('Something went wrong!')
                }
            })
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