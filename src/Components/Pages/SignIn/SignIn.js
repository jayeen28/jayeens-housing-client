import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Header from '../Shared/Header/Header';

const SignIn = () => {
    const { userSignin } = useAuth();
    const { handleSubmit, register, reset } = useForm();
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from;
    const onSubmit = data => {
        const { userEmail, userPass } = data;
        userSignin(userEmail, userPass, history, redirect_uri);
        reset();
    }
    return (
        <div className="signin-page">
            <Header />
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
        </div>
    );
};

export default SignIn;