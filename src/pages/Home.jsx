import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <WhyChooseUs/>
        </div>
    );
};

export default Home;