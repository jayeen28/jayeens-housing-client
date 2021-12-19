import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './ThankyouPage.css';

const ThankyouPage = () => {
    return (
        <div>
            {/* thank you page */}
            <Header />
            <Container>
                <div className="thankyou-page-contents">
                    <h1>Thank you for choosing us.</h1>
                    <h3>We will email you when the booking will be confirmed.</h3>
                    <Link to="/dashboard/mybookings" className="jbutton">Click to see your bookings</Link>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default ThankyouPage;