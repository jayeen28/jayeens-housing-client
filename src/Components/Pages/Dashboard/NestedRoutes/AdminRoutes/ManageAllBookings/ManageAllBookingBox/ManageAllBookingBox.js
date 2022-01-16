import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './ManageAllBookingBox.css';
import useSwal from '../../../../../../Hooks/useSwal';

const ManageAllBookingBox = ({ bookingData, setrender, render }) => {
    const { swalModal } = useSwal();
    const { _id, name, img, description, price, bookstatus, bookingInfo } = bookingData;
    const { bookingDate, bookingTime, bookedBy } = bookingInfo;
    const [bookStat, setbookStat] = useState(bookstatus);
    const [customerData, setcustomerData] = useState({});
    const [readBtn, setreadBtn] = useState(true);
    const [descShow, setdescShow] = useState(description.slice(0, 255));
    const [isLoading, setisLoading] = useState(false);
    const [customerinfoLoading, setcustomerinfoLoading] = useState(true);
    const { email, phone } = customerData;

    const readMore = () => {
        const readBtnText = document.getElementById(`${_id}`)
        if (readBtn) {
            setdescShow(description);
            setreadBtn(false);
            readBtnText.innerText = 'Read less'
        }
        else {
            setdescShow(description.slice(0, 255));
            setreadBtn(true);
            readBtnText.innerText = 'Read more'
        }
    }

    //GET CUSTOMER INFO 
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}users?uid=${bookedBy}`)
            .then(res => res.json())
            .then(data => {
                setcustomerData(data)
                setcustomerinfoLoading(false);
            })
    }, [bookedBy])

    //DELETE BOOKING
    const deleteBook = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}bookedapartments/delete?id=${_id}`;
        const title = "Are you sure you want to delete?";
        swalModal(title, url, render, setrender)
    }

    //APPROVE BOOKING
    const updateBookingStatus = () => {
        setisLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}bookedapartments?id=${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Confirmed' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setbookStat('Confirmed');
                }
                else {
                    alert('Something went wrong');
                }
                setisLoading(false);
            })
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
            border: '1px solid #1d6b6f', margin: '40px 0px', backgroundColor: 'white',
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
                        description.length < 251 ?
                            <p className="apt-desc">
                                {
                                    description
                                }
                            </p>
                            :
                            <p className="apt-desc">
                                {descShow + '...'}<button style={{ backgroundColor: '#1d6b6f', color: 'white', border: 'none', borderRadius: '5px' }} id={`${_id}`} onClick={() => readMore()}>Read more</button>
                            </p>
                    }

                    <p className="apt-price"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Price: </span> {price}</p>

                    <div className="booking-left-desc">
                        <p className="apt-bookedate"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Booked at: </span> {bookingDate + ' | ' + bookingTime}</p>
                        <p className="apt-status"><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Status: </span>{bookStat}</p>
                    </div>
                    <div className="customer-info">
                        <div><span style={{ color: '#3D777A', fontWeight: 'bold' }}>Customer info:</span></div>
                        {
                            customerinfoLoading ? 'LOADING. . .'
                                :
                                <>
                                    <div className="customer-phone"> {phone} || </div>
                                    <div className="customer-email">{email}</div>
                                </>
                        }
                    </div>
                    <div className="manage-all-bookings-btn">
                        <button className="jbutton" onClick={deleteBook}>Delete</button>
                        <div>
                            {bookStat === 'Processing' &&
                                <>
                                    {isLoading && <CircularProgress sx={{ color: '#3D777A' }} size={26} />}
                                    <button className="jbutton" onClick={updateBookingStatus}>Confirm
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default ManageAllBookingBox;