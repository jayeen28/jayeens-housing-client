import React from 'react';
import { Container } from '@mui/material';
const Banner = () => {
    return (
        <Container sx={{ borderBottom: '1px solid black' }}>
            <h1 style={{ textAlign: 'center', height: '450px' }}>This is banner</h1>
        </Container>
    );
};

export default Banner;