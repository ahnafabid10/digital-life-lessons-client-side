import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../Firebase/Firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser = ({email, password})=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password )
    }

    const signInUser = ({ email, password})=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = ()=>{
         setLoading(true)
        return signOut(auth)
    }

    const googleSignIn = ()=>{
        setLoading(true)
        signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
             setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        loading,
        signInUser,
        registerUser,
        logOut,
        googleSignIn

    }
 
    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;