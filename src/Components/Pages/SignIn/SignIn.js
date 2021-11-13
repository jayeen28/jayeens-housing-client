import { Container, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './Signin.css';

const SignIn = () => {
    const { userSignin } = useAuth();
    const { handleSubmit, register, reset } = useForm();
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/dashboard';
    const onSubmit = data => {
        const { userEmail, userPass } = data;
        userSignin(userEmail, userPass, history, redirect_uri);
        reset();
    }
    return (
        <div className="signin-page">
            <Header />
            <Container>
                <h2 className="jsectionhead">Sign in</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
                    <TextField id="outlined-basic" label="Your email" {...register('userEmail')} variant="outlined" />
                    <TextField id="outlined-basic" label="Your password" {...register('userPass')} variant="outlined" />
                    <button type="submit" className="jbutton">Contained</button>
                </form>
                <p style={{ textAlign: 'center' }}>
                    New here? please <Link to='/signup' style={{
                        color: '#1D6B6F', fontWeight: 'bold',
                        textDecoration: 'underline'
                    }}>Sign Up</Link>
                </p>
            </Container>
            <Footer />
        </div>
    );
};

export default SignIn;