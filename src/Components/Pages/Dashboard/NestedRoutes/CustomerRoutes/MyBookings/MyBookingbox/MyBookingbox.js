import React from 'react';
import { Grid, useTheme } from '@mui/material';
import './MyBookingbox.css';
// import { makeStyles } from '@mui/styles';

const MyBookingbox = ({ apartmentData }) => {
    const { _id, name, img, description, price, bookstatus, bookingInfo } = apartmentData;
    const { bookingDate, bookingTime } = bookingInfo;
    const cancelBooking = () => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/bookedapartments/delete?id=${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    // const theme = useTheme();
    // const useStyle = makeStyles({
    //     myBookingMobile: {
    //         [theme.breakpoints.down('sm')]: {
    //             padding: '0px'
    //         }
    //     }
    // });
    // const { myBookingMobile } = useStyle();
    return (
        <Grid container sx={{
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
                    <p className="apt-desc">{description}</p>
                    <p className="apt-price"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Price: </span> {price}</p>
                    <div className="booking-left-desc">
                        <p className="apt-bookedate"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Booked at: </span> {bookingDate + ' | ' + bookingTime}</p>
                        <p className="apt-status"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Status: </span>{bookstatus}</p>
                    </div>
                    <button className="jbutton" onClick={cancelBooking}>Cancel</button>
                </div>
            </Grid>
        </Grid>
    );
};

export default MyBookingbox;