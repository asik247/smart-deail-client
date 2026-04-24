import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaTag } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';

const DetailsProducts = () => {
    const product = useLoaderData();
    //! load authProvider in user;
    const {user} = use(AuthContext)
    // Modal UseRef;
    const modalRef = useRef(null)
    const handleModal = () => {
        modalRef.current.showModal()
    }
    const handleBidsSubmit = (e)=>{
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(name,email,bid);
    }

    const {
        title,
        price_min,
        price_max,
        email,
        category,
        created_at,
        image,
        status,
        location,
        seller_image,
        seller_name,
        condition,
        usage,
        description,
        seller_contact,
    } = product;

    const formattedDate = new Date(created_at).toLocaleDateString('en-BD', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                    {/* LEFT — Image */}
                    <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-80 object-cover"
                        />
                        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {category}
                            </span>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${condition === 'used' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                                {condition} · {usage}
                            </span>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-600'}`}>
                                {status}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — Core Info */}
                    <div className="flex flex-col gap-4">

                        {/* Title + Price */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <h1 className="text-xl font-bold text-gray-900 leading-snug mb-4">
                                {title}
                            </h1>
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-2xl font-bold text-blue-600">
                                    ৳{price_min.toLocaleString()}
                                </span>
                                <span className="text-gray-400 text-sm">to</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    ৳{price_max.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">Negotiable price range</p>
                        </div>

                        {/* Meta Info */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                                <span>{location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FaClock className="text-blue-400 flex-shrink-0" />
                                <span>Posted on {formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FaTag className="text-blue-400 flex-shrink-0" />
                                <span>{usage}</span>
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Seller</p>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={seller_image}
                                    alt={seller_name}
                                    className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{seller_name}</p>
                                    <p className="text-xs text-gray-400">{email}</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-2">
                                {/* Buy Button */}
                                <button onClick={handleModal} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-150 cursor-pointer shadow-sm">
                                    🛒 I Want to Buy This Product
                                </button>
                                {/* Modal code */}


                                <dialog ref={modalRef} className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">
                                        <h3 className="font-bold text-lg">Give the best offer!</h3>
                                        <p className="py-4">Offer something seller can not resist</p>
                                        {/* custom from */}
                                        <form onSubmit={handleBidsSubmit}>
                                            <fieldset className="fieldset">
                                                <label className="label">Name</label>
                                                <input type="text" 
                                                className="input"
                                                name='name' readOnly defaultValue={user.displayName} />
                                              {/* Email Fieled */}
                                                <label className="label">Email</label>
                                                <input type="email" className="input" name='email' readOnly defaultValue={user.email} />
                                                {/* Bids */}
                                                <label className="label">Bid</label>
                                                <input type="text" 
                                                className="input" 
                                                name='bid'
                                                placeholder='Your Bids' />

                                                
                                                <button className="btn btn-neutral mt-4">Please your bid</button>
                                            </fieldset>
                                        </form>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>

                                {/* Call + Email */}
                                <div className="flex gap-2">
                                    <a
                                        href={`tel:${seller_contact}`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-150"
                                    >
                                        <FaPhone className="text-xs" />
                                        Call
                                    </a>
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 active:scale-95 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition-all duration-150"
                                    >
                                        <FaEnvelope className="text-xs" />
                                        Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom — Description */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Description</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default DetailsProducts;