import { Grid, Rating } from '@mui/material';
import React, { useState } from 'react';
import './ReviewBox.css';

const ReviewBox = ({ customerReview }) => {
    const { _id, name, review, rating } = customerReview;
    const [readBtn, setreadBtn] = useState(true);
    const [reviewShow, setreviewShow] = useState(review.slice(0, 150));
    const readMore = () => {
        const readBtnText = document.getElementById(`${_id}`)
        if (readBtn) {
            setreviewShow(review);
            setreadBtn(false);
            readBtnText.innerText = 'Read less'
        }
        else {
            setreviewShow(review.slice(0, 150));
            setreadBtn(true);
            readBtnText.innerText = 'Read more'
        }
    }
    return (
        <Grid item xs={12} sm={12} md={4}>
            <div className="reviewbox">
                <div className="rbox-head">
                    <h4 style={{ fontStyle: 'italic', textTransform: 'capitalize', margin: '0px' }}>{name}</h4>
                    <Rating name="read-only" value={rating} readOnly />
                </div>
                <div className="review-description">
                    {
                        review.length < 151 ?
                            <p>
                                {review}
                            </p>
                            :
                            <p>
                                {reviewShow + '...'}<button style={{ backgroundColor: '#3D777A', color: 'white' }} id={`${_id}`} onClick={() => readMore()}>Read more</button>
                            </p>
                    }
                </div>
            </div>
        </Grid>
    );
};

export default ReviewBox;