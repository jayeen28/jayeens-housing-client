import { Alert, Container, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './SignUp.css';

const SignUp = () => {
    const { userSignup, error } = useAuth()
    const history = useHistory();
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = data => {
        const { userName, userEmail, userPass } = data;
        userSignup(userEmail, userPass, userName, history)
        reset();
    }
    return (
        <div className="signin-page">
            <Header />
            <Container>
                <h2 className="jsectionhead">sign up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                    <TextField type="text" label="Your name" {...register('userName')} variant="outlined" />
                    <TextField type="email" label="Your email" {...register('userEmail')} variant="outlined" />
                    <TextField type="password" label="Your password" {...register('userPass')} variant="outlined" />
                    {error.length > 1 && <Alert severity="error">{error}</Alert>}
                    <button type="submit" className="jbutton">Contained</button>
                </form>
                <p style={{ textAlign: 'center' }}>
                    Already signed up? please <Link to='/signin' style={{
                        color: '#1D6B6F', fontWeight: 'bold',
                        textDecoration: 'underline'
                    }}>Sign in</Link>
                </p>
            </Container>
            <Footer />
        </div>
    );
};

export default SignUp;