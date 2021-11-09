import React from 'react';
import Banner from './Banner/Banner';
import './Home.css';
import HomeApartments from './HomeApartments/HomeApartments';
const Home = () => {
    return (
        <main className="home-page">
            <div className="banner-section">
                <Banner />
                <HomeApartments />
            </div>
        </main>
    );
};

export default Home;