import React from 'react';
import { Container } from '@mui/material';

const Footer = () => {
    return (
        <footer className="footer-section">
            <Container sx={{ borderTop: '1px solid black' }}>
                <h3 style={{ textAlign: 'center', height: '100px' }}>this is footer</h3>
            </Container>
        </footer>
    );
};

export default Footer;