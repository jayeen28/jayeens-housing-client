import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import footerbrand from '../../../../images/jayeens-housing-footer.png';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useHistory } from 'react-router-dom';


const Footer = () => {
    const { transcript, listening } = useSpeechRecognition();
    const [redirectUrl, setRedirectUrl] = useState('');
    let history = useHistory();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        alert('Your subscription has been submitted')
        reset();
    }
    const pageUrls = {
        home: '/',
        apartments: '/apartments',
        signin: '/signin',
        signup: '/signup',
        dashboard: '/dashboard',
    }
    useEffect(() => {
        if (!listening && transcript !== '') {
            const matchedRoute = Object.keys(pageUrls).find(key => {
                if (transcript.includes(key)) {
                    return pageUrls[key];
                }
            });
            console.log(matchedRoute)
            history.push(matchedRoute);
        }
    }, [listening, pageUrls, transcript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }
    return (
        <footer className="footer-section">
            <Container sx={{ borderTop: '1px solid #1D6B6F' }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="footer-left">
                            <div className="footer-logo">
                                <img src={footerbrand} alt="FooterBrand" />
                            </div>
                            <div className="footer-description">
                                <p>We have a lot of good property and one of that
                                    is this property and for that we have arranged a
                                    catalogue for you.
                                </p>
                            </div>
                            <div className="footer-icons">
                                <a href="mailto:jayeen6783@gmail.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faEnvelope} /></a>
                                <a href="https://facebook.com/jayeen28" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                                <a href="https://instagram.com/jay__een/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                                <a href="https://twitter.com/jayeen28" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className="footer-right">
                            <div>
                                <>{transcript}</>
                                <button onClick={SpeechRecognition.startListening}>Start</button>
                                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                            </div>
                            <h2>Subscribe to our newsletter</h2>
                            <form className="subscribe-form" onSubmit={handleSubmit(onSubmit)}>
                                <TextField id="outlined-basic" label="Your email" variant="outlined"{...register('email')} />
                                <button className="jbutton" type="submit">Subscribe</button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </footer >
    );
};

export default Footer;