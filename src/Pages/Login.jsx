import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div>
           <Link to={'/auth/registation'}> <h2>LogIn here</h2></Link>
        </div>
    );
};

export default Login;