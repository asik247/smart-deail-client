import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const links = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/allProducts'}>All Products</NavLink>
        <NavLink to={'/myProducts'}>My Products</NavLink>
        <NavLink to={'/myBids'}>My Bids</NavLink>
    </>
    return (

        <div className='flex justify-between items-center shadow-xl p-10'>
            {/* logo */}
            <div>
                <h2>SmartDeail</h2>
            </div>
            {/* Links */}
            <div className='flex justify-center gap-5'>
                {links}
            </div>
            {/* Btn */}
            <div>
               <Link to={'/auth'}>LogIn</Link>
            </div>
        </div>
    );
};

export default Navbar;