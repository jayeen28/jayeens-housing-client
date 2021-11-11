import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApartmentBox from '../../RouteShared/ApartmentBox';

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
            <h2>We have total {allBookings.length} Bookings</h2>
            {
                isloading ?
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                    :
                    <>
                        {
                            allBookings.map(aprt => <ApartmentBox key={aprt._id} apartmentData={aprt} />)
                        }
                    </>
            }
        </div>
    );
};

export default ManageAllBookings;