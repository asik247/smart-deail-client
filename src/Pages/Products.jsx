import React from 'react';
import { Link } from 'react-router';

const Products = ({ product }) => {
    const {
        title,
        price_min,
        price_max,
        image,
        seller_name,
        seller_image,
        condition,
        location,
        category,
        _id
    } = product;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 max-w-sm cursor-pointer">

            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-lg">
                    {category}
                </span>
                {/* Condition Badge */}
                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-lg capitalize
                    ${condition === 'used'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                    {condition}
                </span>
            </div>

            {/* Content */}
            <div className="p-4">

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2">
                    {title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-base font-bold text-gray-900">
                        ৳{price_min.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">–</span>
                    <span className="text-base font-bold text-gray-900">
                        ৳{price_max.toLocaleString()}
                    </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 mb-4">
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-xs text-gray-500">{location}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-3" />

                {/* Seller + Button */}
                <div className="flex items-center justify-between gap-2">
                    {/* Seller */}
                    <div className="flex items-center gap-2 min-w-0">
                        <img
                            src={seller_image}
                            alt={seller_name}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-xs text-gray-500 truncate">
                            {seller_name}
                        </span>
                    </div>

                    {/* Button */}
                    <Link to={`/detailsPages/${_id}`} className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-150 flex-shrink-0 whitespace-nowrap cursor-pointer">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Products;