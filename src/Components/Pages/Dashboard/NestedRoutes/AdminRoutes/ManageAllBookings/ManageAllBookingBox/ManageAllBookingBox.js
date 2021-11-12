import React, { useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './ManageAllBookingBox.css';

const ManageAllBookingBox = ({ bookingData }) => {
    const { _id, name, img, description, price, bookstatus, bookingInfo } = bookingData;
    const { bookingDate, bookingTime } = bookingInfo;
    const [readBtn, setreadBtn] = useState(true);
    const [descShow, setdescShow] = useState(description.slice(0, 297));

    const readMore = () => {
        const readBtnText = document.getElementById(`${_id}`)
        if (readBtn) {
            setdescShow(description);
            setreadBtn(false);
            readBtnText.innerText = 'Read less'
        }
        else {
            setdescShow(description.slice(0, 297));
            setreadBtn(true);
            readBtnText.innerText = 'Read more'
        }
    }


    const deleteBook = () => {
        const deleteRes = window.alert('Are you sure, you want to delete?')
        if (deleteRes) {
            fetch(`https://obscure-refuge-52189.herokuapp.com/bookedapartments/delete?id=${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }
    }
    const updateBookingStatus = () => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/bookedapartments?id=${_id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    const theme = useTheme();
    const useStyle = makeStyles({
        myBookingMobile: {
            [theme.breakpoints.down('sm')]: {
                margin: '40px 0px!important'
            }
        }
    });
    const { myBookingMobile } = useStyle();
    return (
        <Grid className={myBookingMobile} container sx={{
            border: '1px solid #3D777A', margin: '40px 10px', backgroundColor: 'white',
            boxShadow: '#00000070 0px 0px 8px', borderRadius: '15px'
        }}>
            <Grid item lg={6}>
                <div className="bookingbox-left">
                    <img src={img} alt="apartmentImage" style={{ width: '100%', height: '100%', borderRadius: '15px' }} />
                </div>
            </Grid>
            <Grid item lg={6}>
                <div className="bookingbox-right">
                    <h2 className="apt-name">{name}</h2>

                    {
                        description.length < 298 ?
                            <p className="apt-desc">
                                {
                                    description
                                }
                            </p>
                            :
                            <p className="apt-desc">
                                {descShow + '...'}<button style={{ backgroundColor: '#3D777A', color: 'white', border: 'none', borderRadius: '5px' }} id={`${_id}`} onClick={() => readMore()}>Read more</button>
                            </p>
                    }

                    <p className="apt-price"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Price: </span> {price}</p>

                    <div className="booking-left-desc">
                        <p className="apt-bookedate"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Booked at: </span> {bookingDate + ' | ' + bookingTime}</p>
                        <p className="apt-status"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Status: </span>{bookstatus}</p>
                    </div>
                    <div className="manage-all-bookings-btn">
                        <button className="jbutton" onClick={deleteBook}>Delete</button>
                        <button className="jbutton" onClick={updateBookingStatus}>Approve</button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default ManageAllBookingBox;