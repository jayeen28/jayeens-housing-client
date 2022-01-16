import { CircularProgress, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApartmentBox from '../../Shared/ApartmentBox/ApartmentBox';
import './HomeApartments.css';

const HomeApartments = () => {
    const [apartments, setaparments] = useState([]);
    const [isLaoding, setisLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}apartments`)
            .then(res => res.json())
            .then(data => {
                setaparments(data);
                setisLoading(false);
            })
    }, [])
    return (
        <section className="home-apartments">
            <Container>
                <div className="home-aprtments-head">
                    <h1 className="jsectionhead">Our Popular apartments</h1>
                </div>
                <div className="aprtments-boxes">
                    {
                        isLaoding ?
                            <div style={{ textAlign: 'center' }}><CircularProgress sx={{ color: '#3D777A' }} /></div>
                            :
                            <Grid container spacing={12}>
                                {
                                    apartments?.slice(0, 6).map(aprt => <ApartmentBox key={aprt._id} apartment={aprt} />)
                                }
                            </Grid>
                    }
                </div>
            </Container>
        </section>
    );
};

export default HomeApartments;