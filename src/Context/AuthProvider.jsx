import React from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    //TODO: Create user/Registation code here;
    const registerUsers = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //TODO:Login user/singIn code here;
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userInfo = {
        registerUsers,
        login
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;