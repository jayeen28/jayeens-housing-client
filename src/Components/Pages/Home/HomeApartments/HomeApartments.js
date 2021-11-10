import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApartmentBox from '../../Shared/ApartmentBox/ApartmentBox';

const HomeApartments = () => {
    const [apartments, setaparments] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/apartments')
            .then(res => res.json())
            .then(data => setaparments(data))
    }, [])
    return (
        <section className="home-apartments">
            <Container>
                <div className="home-aprtments-head">
                    <h1>Your apartments</h1>
                </div>
                <div className="aprtments-boxes">
                    <Grid container spacing={12}>
                        {
                            apartments?.slice(0, 6).map(aprt => <ApartmentBox key={aprt._id} apartment={aprt} />)
                        }
                    </Grid>
                </div>
            </Container>
        </section>
    );
};

export default HomeApartments;