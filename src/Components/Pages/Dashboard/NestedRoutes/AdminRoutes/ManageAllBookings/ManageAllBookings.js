import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ManageAllBookingBox from './ManageAllBookingBox/ManageAllBookingBox';

const ManageAllBookings = () => {
    const [allBookings, setallBookings] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [render, setrender] = useState(false);
    const [displayBookingStat, setdisplayBookingStat] = useState('Confirmed');
    useEffect(() => {
        setisloading(true)
        fetch(`http://localhost:5000/bookedapartments/${displayBookingStat}`)
            .then(res => res.json())
            .then(data => {
                setallBookings(data);
                setisloading(false);
            })
    }, [render, displayBookingStat])
    return (
        <div>
            <h2 className="jsectionhead">Manage all bookings<small style={{ display: 'block', fontSize: '14px', color: '#1D6B6F' }}>Total {allBookings.length} {displayBookingStat} bookings</small></h2>

            <div className="managebookings-btn" style={{ textAlign: 'center' }}>
                <button className="jbutton" style={{ margin: '0px 5px' }} onClick={() => setdisplayBookingStat('Confirmed')}>Confirmed</button>
                <button className="jbutton" style={{ margin: '0px 5px' }} onClick={() => setdisplayBookingStat('Processing')}>Paid</button>
                <button className="jbutton" style={{ margin: '0px 5px' }} onClick={() => setdisplayBookingStat('Unpaid')}>Unpaid</button>
            </div>

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