import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import ApartmentBox from '../Shared/ApartmentBox/ApartmentBox';
import Header from '../Shared/Header/Header';

const Apartments = () => {
    const [apartments, setapartments] = useState([]);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/apartments')
            .then(res => res.json())
            .then(data => setapartments(data))
    }, [])
    return (
        <div className="explore-page">
            <Header />
            <Container>
                <div className="explore-page-head">
                    Explore more apartments
                </div>
                <Grid container spacing={12}>
                    {
                        apartments?.map(aprt => <ApartmentBox key={aprt._id} apartment={aprt} />)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Apartments;