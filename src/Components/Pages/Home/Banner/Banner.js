import React from 'react';
import { Container, Grid, useTheme } from '@mui/material';
import jHousingBanner from '../../../../images/jayeens-housing-banner.png';
import './Banner.css'
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const Banner = () => {
    const theme = useTheme();
    const useStyle = makeStyles({
        bannerRev: {
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse!important'
            },
        }
    })
    const { bannerRev } = useStyle();
    return (
        <section className="banner-section">
            <Container>
                <Grid container spacing={5} className={bannerRev}>
                    <Grid item xs={12} sm={12} md={6} sx={{ paddingTop: '0px!important' }}>
                        <div className="business-tagline">
                            <h1>
                                Carve Out A Great <br /> Life at Jayeen's Housing.
                            </h1>
                            <Link to="/apartments" className="jbutton">Explore our apartments</Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="jHousing-banner">
                            <img src={jHousingBanner} alt="BannerImage" style={{ width: '100%' }} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Banner;