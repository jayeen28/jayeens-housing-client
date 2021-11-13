import { Container, Grid } from '@mui/material';
import React from 'react';
import './AboutSection.css';
import abtImage from '../../../../images/dreamhouse.png'
import { Link } from 'react-router-dom';

const AboutSection = () => {
    return (
        <section className="aboutus-section">
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="abt-image">
                            <img src={abtImage} alt="aboutsectionImage" style={{ width: '100%' }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="abt-text">
                            <p style={{ color: '#1D6B6F', margin: '5px 0px' }}>ABOUT US</p>
                            <h2>We will make your dream house come true.</h2>
                            <p>We are one of the best service provider and this will help you make a good property in the easiest way and this is one of the best and a proper way to buy of rent your suitable flat.</p>
                            <Link to="/apartments" className="jbutton">Book now !</Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default AboutSection;