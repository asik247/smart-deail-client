import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-blue-500 font-semibold" : ""
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/allProducts"
                className={({ isActive }) =>
                    isActive ? "text-blue-500 font-semibold" : ""
                }
            >
                All Products
            </NavLink>

            <NavLink
                to="/myProducts"
                className={({ isActive }) =>
                    isActive ? "text-blue-500 font-semibold" : ""
                }
            >
                My Products
            </NavLink>

            <NavLink
                to="/myBids"
                className={({ isActive }) =>
                    isActive ? "text-blue-500 font-semibold" : ""
                }
            >
                My Bids
            </NavLink>
        </>
    );

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

                {/* Logo */}
                <h2 className="text-xl font-bold text-blue-600">
                    SmartDeal
                </h2>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {links}
                </div>

                {/* Login Button */}
                <div className="hidden md:block">
                    <Link
                        to="/auth"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden flex flex-col gap-4 px-5 pb-5">
                    {links}
                    <Link
                        to="/auth"
                        className="bg-blue-500 text-white px-4 py-2 rounded text-center"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;