import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorRoute.css';

const ErrorRoute = () => {
    return (
        <Container>
            <div className="error-content">
                <h1>404 Error!</h1>
                <Link to='/dashboard' className="jbutton">Go back to dashboard</Link>
            </div>
        </Container>
    );
};

export default ErrorRoute;