import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../Hooks/useAuth';
import ApartmentBox from '../../RouteShared/ApartmentBox';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookedApartments, setbookedApartments] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/apartments/find?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => setbookedApartments(data))
    }, [user.uid])
    return (
        <Container>
            <h2>My bookings</h2>
            <div className="apartment-boxes">
                {
                    bookedApartments.map(aprt => <ApartmentBox key={aprt._id} apartmentData={aprt} />)
                }
            </div>
        </Container>

    );
};

export default MyBookings;