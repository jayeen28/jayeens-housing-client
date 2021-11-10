import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = data => {
        console.log(data)
        reset();
    }
    return (
        <Container>
            This is sign in page
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField id="outlined-basic" label="Your email" {...register('userEmail')} variant="outlined" />
                <TextField id="outlined-basic" label="Your password" {...register('userPass')} variant="outlined" />
                <Button type="submit" variant="contained">Contained</Button>
            </form>
            <Typography>
                New here? please <Link to='/signup'>Sign Up</Link>
            </Typography>
        </Container>
    );
};

export default SignIn;