import React from 'react';
import LatestProducts from './LatestProducts';

const fetchPromiseLatestProducts = fetch('http://localhost:3000/latestProducts')
    .then(res => res.json())

const Home = () => {
    return (
        <div>
            {/* Banner */}
            <div className="relative min-h-[520px] bg-gray-950 overflow-hidden flex items-center">

                {/* Background image with overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400"
                        alt="banner"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">

                    {/* Left - Text */}
                    <div className="flex-1 text-center md:text-left">
                        {/* Badge */}
                        <span className="inline-block bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-blue-500/20 mb-6">
                            🛒 Bangladesh's Trusted Marketplace
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                            Buy & Sell <br />
                            <span className="text-blue-400">Anything</span>, Anywhere
                        </h1>

                        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md">
                            Find the best deals on electronics, gadgets, and more — from trusted sellers near you.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <button className="bg-blue-500 hover:bg-blue-400 active:scale-95 transition-all text-white font-semibold text-sm px-6 py-3 rounded-xl cursor-pointer">
                                Browse Products
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white font-medium text-sm px-6 py-3 rounded-xl border border-white/10 cursor-pointer">
                                Sell Now →
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-10 justify-center md:justify-start">
                            <div>
                                <p className="text-white font-bold text-xl">10k+</p>
                                <p className="text-gray-500 text-xs">Products</p>
                            </div>
                            <div className="border-l border-gray-700 pl-8">
                                <p className="text-white font-bold text-xl">5k+</p>
                                <p className="text-gray-500 text-xs">Sellers</p>
                            </div>
                            <div className="border-l border-gray-700 pl-8">
                                <p className="text-white font-bold text-xl">Dhaka</p>
                                <p className="text-gray-500 text-xs">& All Districts</p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Floating Card */}
                    <div className="flex-shrink-0 w-72 hidden md:block">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                            <img
                                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"
                                alt="featured"
                                className="w-full h-40 object-cover rounded-xl mb-4"
                            />
                            <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-lg">
                                Electronics
                            </span>
                            <h3 className="text-white font-semibold text-sm mt-2 mb-1">
                                Lenovo IdeaPad Gaming RTX 4060
                            </h3>
                            <p className="text-gray-400 text-xs mb-3">Wari, Dhaka • 7 months old</p>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-400 font-bold text-base">৳75,000 – ৳88,000</span>
                                <button className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <LatestProducts fetchPromiseLatestProducts={fetchPromiseLatestProducts} />
        </div>
    );
};

export default Home;