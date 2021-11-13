import React from 'react';
import { Container, Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer-section">
            <Container sx={{ borderTop: '1px solid #1D6B6F' }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="footer-left">
                            <div className="footer-logo">
                                <h1>LOGO</h1>
                            </div>
                            <div className="footer-description">
                                <p>We have a lot of good property and one of that
                                    is this property and for that we have arranged a
                                    catalogue for you.
                                </p>
                            </div>
                            <div className="footer-icons">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <FontAwesomeIcon icon={faFacebook} />
                                <FontAwesomeIcon icon={faInstagram} />
                                <FontAwesomeIcon icon={faTwitter} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="footer-right">
                            <h2>Subscribe to our newsletter</h2>
                            <form className="subscribe-form">
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <button className="jbutton">Subscribe</button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </footer >
    );
};

export default Footer;