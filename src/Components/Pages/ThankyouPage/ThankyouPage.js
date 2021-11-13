import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './ThankyouPage.css';

const ThankyouPage = () => {
    return (
        <div>
            <Header />
            <Container>
                <div className="thankyou-page-contents">
                    <h1>Thank you for choosing us.</h1>
                    <h3>We will contact you as soon as possible</h3>
                    <Link to="/" className="jbutton">Go back to home page</Link>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default ThankyouPage;