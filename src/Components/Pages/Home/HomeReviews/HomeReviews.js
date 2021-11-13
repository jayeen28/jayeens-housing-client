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
                {reviews.length === 0 ? <p style={{ textAlign: 'center' }}>No reviews to show. Please give us a review.</p> :
                    <div className="review-boxes">
                        <Grid container>
                            {
                                reviews.map(rvw => <ReviewBox key={rvw._id} customerReview={rvw} />)
                            }
                        </Grid>
                    </div>
                }
            </Container>
        </section>
    );
};

export default HomeReviews;