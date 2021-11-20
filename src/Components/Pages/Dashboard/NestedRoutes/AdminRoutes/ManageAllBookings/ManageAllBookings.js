import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ManageAllBookingBox from './ManageAllBookingBox/ManageAllBookingBox';

const ManageAllBookings = () => {
    const [allBookings, setallBookings] = useState([]);
    const [isloading, setisloading] = useState(true);
    const [render, setrender] = useState(false);
    useEffect(() => {
        fetch('https://afternoon-earth-46164.herokuapp.com/bookedapartments')
            .then(res => res.json())
            .then(data => {
                setallBookings(data);
                setisloading(false);
            })
    }, [render])
    return (
        <div>
            <h2 className="jsectionhead">Manage all bookings<small style={{ display: 'block', fontSize: '14px', color: '#1D6B6F' }}>Total {allBookings.length} bookings</small></h2>
            {
                isloading ?
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: '#3D777A' }} />
                    </div>
                    :
                    <>
                        {
                            allBookings.map(aprt => <ManageAllBookingBox key={aprt._id} bookingData={aprt} setrender={setrender} render={render} />)
                        }
                    </>
            }
        </div>
    );
};

export default ManageAllBookings;