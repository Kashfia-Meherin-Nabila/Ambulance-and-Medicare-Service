import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';

import HospitalSelection from './HospitalSelection';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <Banner/>
            <WhyChooseUs/>
            <HospitalSelection limit={9}/>
            <FAQ/>
        </div>
    );
};

export default Home;