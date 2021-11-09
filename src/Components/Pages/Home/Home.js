import React from 'react';
import Banner from './Banner/Banner';
import './Home.css';
const Home = () => {
    return (
        <main className="home-page">
            <div className="banner-section">
                <Banner />
            </div>
        </main>
    );
};

export default Home;