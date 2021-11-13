import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Grid } from '@mui/material';
import ApartmentBox from '../Shared/ApartmentBox/ApartmentBox';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const Apartments = () => {
    const [apartments, setapartments] = useState([]);
    const [isLaoding, setisLoading] = useState(true);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/apartments')
            .then(res => res.json())
            .then(data => {
                setapartments(data);
                setisLoading(false)
            })
    }, [])
    return (
        <div className="explore-page">
            <Header />
            <Container>
                <div className="explore-page-head">
                    <h1 className="jsectionhead">Explore more apartments</h1>
                </div>
                {
                    isLaoding ?
                        <div style={{ textAlign: 'center' }}><CircularProgress sx={{ color: '#3D777A' }} /></div>
                        :
                        <Grid container spacing={12}>
                            {
                                apartments?.map(aprt => <ApartmentBox key={aprt._id} apartment={aprt} />)
                            }
                        </Grid>
                }
            </Container>
            <Footer />
        </div>
    );
};

export default Apartments;