import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <Header />
            <Container>
                <div className="error-content">
                    <h1>404 Error!</h1>
                    <Link to='/' className="jbutton">Go back to home page</Link>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default ErrorPage;