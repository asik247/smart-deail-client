import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const { user } = use(AuthContext)
    const [bids, setBids] = useState([])
    //?Token;
    // console.log('AccessToken',user.accessToken);
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
                // ! send accessToken in server side;
                headers:{
                    authorization:`Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setBids(data)
                })
        }
    }, [user?.email,user?.accessToken])

    //? Delete my bids code here;
    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                fetch(`http://localhost:3000/bids/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            const remaining = bids.filter(bid => bid._id !== id)
                            setBids(remaining)
                        }
                    })
            }

        });
    }



    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">
                My Bids ({bids.length})
            </h2>

            <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
                <table className="table">

                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            bids.map((bid, index) => (
                                <tr key={bid._id} className="hover">

                                    {/* Serial */}
                                    <td>{index + 1}</td>

                                    {/* User Info */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={bid?.buyer_img}
                                                        alt="user"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td>{bid.buyer_email}</td>

                                    {/* Price */}
                                    <td className="font-semibold text-green-600">
                                        {bid.bid_price} ৳
                                    </td>

                                    {/* Status */}
                                    <td>
                                        <span className={`badge 
                                            ${bid.status === "pending" && "badge-warning"}
                                            ${bid.status === "accepted" && "badge-success"}
                                            ${bid.status === "rejected" && "badge-error"}
                                        `}>
                                            {bid.status}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td>
                                        <button
                                            onClick={() => handleDelete(bid._id)}
                                            className="btn btn-error btn-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;