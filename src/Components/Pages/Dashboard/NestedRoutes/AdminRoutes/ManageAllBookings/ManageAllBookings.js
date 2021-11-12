import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ManageAllBookingBox from './ManageAllBookingBox/ManageAllBookingBox';

const ManageAllBookings = () => {
    const [allBookings, setallBookings] = useState([]);
    const [isloading, setisloading] = useState(true);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/bookedapartments')
            .then(res => res.json())
            .then(data => {
                setallBookings(data);
                setisloading(false);
            })
    }, [])
    return (
        <div>
            <h2 className="jsectionhead">Total {allBookings.length} Bookings</h2>
            {
                isloading ?
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: '#3D777A' }} />
                    </div>
                    :
                    <>
                        {
                            allBookings.map(aprt => <ManageAllBookingBox key={aprt._id} bookingData={aprt} />)
                        }
                    </>
            }
        </div>
    );
};

export default ManageAllBookings;