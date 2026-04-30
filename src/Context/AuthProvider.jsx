import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    //! user and loading state code here;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //TODO: Create user/Registation code here;
    const registerUsers = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //TODO:Login user/singIn code here;
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //TODO: Signin with google;
    const googleSingIn = () => {
        return signInWithPopup(auth, provider)
    }
    //TODO: LogOut code hre;
    const logOut = () => {
        return signOut(auth)
    }
    //? OnAuthStateChange code here;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUsers) => {
            setUser(currentUsers)
            if (currentUsers) {
                const loggedEmail = {
                    email: currentUsers.email
                }
                fetch('http://localhost:3000/getToken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedEmail)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after token', data);
                        localStorage.setItem('token',data.token)
                    })
            }
            else{
                localStorage.removeItem('token')
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const userInfo = {
        registerUsers,
        login,
        googleSingIn,
        user,
        loading,
        logOut
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;