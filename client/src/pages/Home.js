import React from 'react';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import NavBar from '../components/header/NavBar';
import Header from '../components/header/Header';
import Featured from '../components/home/Featured';
import PropertyList from '../components/home/PropertyList';
import Footer from '../components/footer/Footer';

const Home = () => {

    return (
        <div className='home'>
            {/* HEADER */}
            <NavBar />
            <Header />
            {/* FIRST PRESENTATION */}
            <div className="homeContainer">
                <Featured />
                {/* SECOND PRESENTATION */}
                <h1 className="homeTitle">
                    Quelques types de logements insolites
                </h1>
                <PropertyList />
                {/* THIRD PRESENTATION */}
                <h2 className="homeTitle">
                    Des exemples de logements insolites
                </h2>
                <FeaturedProperties />
            </div>
            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Home;