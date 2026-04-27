import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { SyncLoader } from 'react-spinners';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();
    // console.log(location);
    if(loading){
        return <SyncLoader />
    }
    if(user){
        return children
    }
    return <Navigate state={location ?.pathname} to={'/auth'}></Navigate>
};

export default PrivateRoutes;