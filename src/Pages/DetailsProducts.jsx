import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaTag } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const DetailsProducts = () => {
    const { user } = use(AuthContext)
    const instanceSecure = useAxiosSecure()
    //? useStae for bids
    const [bids, setBids] = useState([]);
    const { title,
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

        seller_contact, _id: productId } = useLoaderData();
    //? useEffect bids data load;
    useEffect(() => {
        instanceSecure(`/products/bids/${productId}`)
            .then(data => setBids(data.data))
    }, [instanceSecure,productId])

    //! load authProvider in user;
    // console.log(user.accessToken);
    // Modal UseRef;
    const modalRef = useRef(null)
    const handleModal = () => {
        modalRef.current.showModal()
    }
    const handleBidsSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(productId, name, email, bid);
        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }
        console.log(newBid);
        // ! Bids data post in database code hre;
        fetch("http://localhost:3000/bids", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after placing bid in database', data);
                //? cheack condition
                if (data.insertedId) {
                    modalRef.current.close()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    //? add the new bid to the state;
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price)
                    setBids(newBids)

                }
            })
    }

    // const {
    //     title,
    //     price_min,
    //     price_max,
    //     email,
    //     category,
    //     created_at,
    //     image,
    //     status,
    //     location,
    //     seller_image,
    //     seller_name,
    //     condition,
    //     usage,
    //     description,
    //     seller_contact,
    // } = product;

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
                                                    name='name' readOnly defaultValue={user?.displayName} />
                                                {/* Email Fieled */}
                                                <label className="label">Email</label>
                                                <input type="email" className="input" name='email' readOnly defaultValue={user?.email} />
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
                    <h2>Bids for this Products <span className='text-primary'>{bids.length}</span></h2>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Image</th>
                                    <th>Email</th>
                                    <th>Bid Price</th>
                                    <th>Your Choice</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    bids.map((bid, index) => (
                                        <tr key={bid._id}>

                                            {/* Serial No */}
                                            <td>{index + 1}</td>

                                            {/* Image */}
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={bid.buyer_image} alt="user" />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td>{bid.buyer_email}</td>

                                            {/* Bid Price */}
                                            <td>{bid.bid_price} ৳</td>

                                            {/* Your Choice */}
                                            <td>
                                                <button

                                                    className="btn btn-success btn-xs mr-2"
                                                >
                                                    Accept
                                                </button>

                                                <button

                                                    className="btn btn-error btn-xs"
                                                >
                                                    Reject
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailsProducts;