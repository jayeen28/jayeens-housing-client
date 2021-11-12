import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../Hooks/useAuth';
import MyBookingbox from './MyBookingbox/MyBookingbox';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookedApartments, setbookedApartments] = useState([]);
    useEffect(() => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/apartments/find?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => setbookedApartments(data))
    }, [user.uid])
    return (
        <div>
            <h2 className="jsectionhead">My bookings</h2>
            <div className="apartment-boxes">
                {
                    bookedApartments.map(aprt => <MyBookingbox key={aprt._id} apartmentData={aprt} />)
                }
            </div>
        </div>

    );
};

export default MyBookings;