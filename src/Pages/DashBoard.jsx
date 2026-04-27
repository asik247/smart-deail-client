import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';

const DashBoard = () => {
    const {loading,user} = use(AuthContext)
    console.log('dashboar current user:',user);
    // if(loading){
    //     return <p>loadgin...</p>
    // }
    return (
    
        <div>
            <h2>DashBoard</h2>
        </div>
    );
};

export default DashBoard;