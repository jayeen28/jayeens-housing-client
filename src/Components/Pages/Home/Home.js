import React from 'react';
import Header from '../Shared/Header/Header';
import Banner from './Banner/Banner';
import './Home.css';
import HomeApartments from './HomeApartments/HomeApartments';
import HomeReviews from './HomeReviews/HomeReviews';
const Home = () => {
    return (
        <div className="home-page">
            <div className="header-section">
                <Header />
            </div>
            <main className="home-page">
                <div className="banner-section">
                    <Banner />
                    <HomeApartments />
                    <HomeReviews />
                </div>
            </main>
        </div>
    );
};

export default Home;