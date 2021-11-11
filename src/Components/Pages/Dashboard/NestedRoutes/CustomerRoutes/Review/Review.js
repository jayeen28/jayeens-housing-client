import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../../../Hooks/useAuth';

const Review = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue } = useForm();
    setValue('name', `${user.displayName}`)
    const onSubmit = data => {
        data.reviewedBy = user.email;
        fetch('https://obscure-refuge-52189.herokuapp.com/reviews/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            Please give us a review
            <div className="add-review-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="Your name" variant="outlined" {...register('name')} required />
                    <TextField
                        label="Your review"
                        rows={4}
                        {...register('review')}
                        multiline
                        required
                    />
                    <Button type="submit" variant="contained">Post</Button>
                </form>
            </div>
        </div>
    );
};

export default Review;