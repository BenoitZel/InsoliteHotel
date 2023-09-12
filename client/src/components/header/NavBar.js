import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <div className='navbar'>
            <div className="navContainer">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">InsoliteHotel</span>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;