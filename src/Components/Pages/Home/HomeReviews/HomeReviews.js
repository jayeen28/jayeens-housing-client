import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

const HomeReviews = () => {
    const [reviews, setreviews] = useState([]);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setreviews(data))
    }, [])
    return (
        <Container>
            <h2>Total reviews{reviews.length}</h2>
        </Container>
    );
};

export default HomeReviews;