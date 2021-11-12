import { Grid, Rating } from '@mui/material';
import React, { useState } from 'react';
import './ReviewBox.css';
import ReviewModal from './ReviewModal';

const ReviewBox = ({ customerReview }) => {
    const [open, setOpen] = useState(false);
    const { name, review, rating } = customerReview;
    return (
        <Grid xs={12} sm={12} md={4}>
            <div className="reviewbox">
                <div className="rbox-head">
                    <h4 style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>{name}</h4>
                    <Rating name="read-only" value={rating} readOnly />
                </div>
                <div className="review-description">
                    <p>
                        {review.slice(0, 120)}<button onClick={() => { setOpen(true) }}>Read more</button>
                    </p>
                </div>
                <ReviewModal open={open} setOpen={setOpen} review={review} name={name} />
            </div>
        </Grid>
    );
};

export default ReviewBox;