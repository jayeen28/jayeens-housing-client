import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import MyBookingbox from './MyBookingbox/MyBookingbox';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookedApartments, setbookedApartments] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [render, setrender] = useState(false);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}apartments/find?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                setbookedApartments(data);
                setisLoading(false);
            })
    }, [user.uid, render])
    return (
        <div>
            <div className="my-booking-head">
                <h2 className="jsectionhead">Your bookings</h2>
            </div>
            <div className="apartment-boxes">
                {
                    isLoading ?
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress sx={{ color: '#3D777A' }} />
                        </div>
                        :
                        bookedApartments.length === 0 ?
                            <div style={{ textAlign: 'center' }}>
                                <p>Sir, you dont have any bookings yet. Please explore our apartments.</p>
                                <Link to="/apartments" className="jbutton">Explore</Link>
                            </div>
                            :
                            bookedApartments.map(aprt => <MyBookingbox key={aprt._id} apartmentData={aprt} render={render} setrender={setrender} />)
                }
            </div>
        </div >

    );
};

export default MyBookings;