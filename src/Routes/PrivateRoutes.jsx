import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoutes = ({children}) => {
    const {user} = useContext(AuthContext)
    const location = useLocation();
    console.log(location);
    if(user){
        return children
    }
    return <Navigate state={location ?.pathname} to={'/auth'}></Navigate>
};

export default PrivateRoutes;