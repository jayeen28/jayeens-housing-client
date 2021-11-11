import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ApartmentBox from '../../Shared/ApartmentBox/ApartmentBox';
import './HomeApartments.css';

const HomeApartments = () => {
    const [apartments, setaparments] = useState([]);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/apartments')
            .then(res => res.json())
            .then(data => setaparments(data))
    }, [])
    return (
        <section className="home-apartments">
            <Container>
                <div className="home-aprtments-head" style={{ textAlign: 'center' }}>
                    <h1>Our Popular apartments</h1>
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