import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReviewBox from './ReviewBox.js/ReviewBox';
import './HomeReviews.css'

const HomeReviews = () => {
    const [reviews, setreviews] = useState([]);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => setreviews(data))
    }, [])
    return (
        <section className="reviews-section">
            <Container>
                <h2 className="jsectionhead">Reviews</h2>
                <div className="review-boxes">
                    <Grid container>
                        {
                            reviews.map(rvw => <ReviewBox key={rvw._id} customerReview={rvw} />)
                        }
                    </Grid>
                </div>
            </Container>
        </section>
    );
};

export default HomeReviews;