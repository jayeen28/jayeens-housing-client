import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const SignUp = () => {
    const { userSignup } = useAuth()
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = data => {
        const { userName, userEmail, userPass } = data;
        userSignup(userEmail, userPass, userName)
        reset();
    }
    return (
        <div className="signin-page">
            <Header />
            <Container>
                This is sign up page
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField id="outlined-basic" label="Your name" {...register('userName')} variant="outlined" />
                    <TextField id="outlined-basic" label="Your email" {...register('userEmail')} variant="outlined" />
                    <TextField id="outlined-basic" label="Your password" {...register('userPass')} variant="outlined" />
                    <Button type="submit" variant="contained">Contained</Button>
                </form>
                <Typography>
                    Already signed up? please <Link to='/signin'>Sign In</Link>
                </Typography>
            </Container>
            <Footer />
        </div>
    );
};

export default SignUp;