import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shares/Navbar';
import Footer from '../pages/shares/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;