import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReviewBox from './ReviewBox.js/ReviewBox';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import './HomeReviews.css';

const HomeReviews = () => {
    const [reviews, setreviews] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}reviews`)
            .then(res => res.json())
            .then(data => setreviews(data))
    }, [])
    return (
        <section className="reviews-section">
            <Container>
                <h2 className="jsectionhead">Reviews</h2>
                {reviews.length === 0 ? <p style={{ textAlign: 'center' }}>No reviews to show. Please give us a review.</p> :
                    <div className="review-boxes">
                        <Swiper
                            className="reviews-swiper"
                            modules={[Pagination]}
                            breakpoints={{
                                300: {
                                    width: 250,
                                    slidesPerView: 1
                                },
                                600: {
                                    width: 600,
                                    slidesPerView: 2,
                                },
                                1215: {
                                    width: 1215,
                                    slidesPerView: 3,
                                },
                            }}
                            spaceBetween={10}
                            slidesPerView={3}
                            pagination={{ clickable: true }}
                        >
                            {
                                reviews.map(rvw => <SwiperSlide key={rvw._id}><ReviewBox key={rvw._id} customerReview={rvw} /></SwiperSlide>)
                            }
                        </Swiper>
                    </div>
                }
            </Container>
        </section>
    );
};

export default HomeReviews;