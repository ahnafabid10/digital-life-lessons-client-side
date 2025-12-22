import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../Hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SocialPage = () => {
    const {googleSignIn, user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
            navigate( location?.state || '/');
            

        // axiosSecure.post('/user', {name: res.user.displayName, email: res.user.email, photoURL:res.user.photoURL})
        // .then(res=>{
        //     console.log('added user info', res.data)}
        // )
        

        axiosSecure.post('/users', {name: user.displayName, email: res.user.email, userId:res.user.uid, isPremium: false})
        .then(res=>{
            console.log('added user info', res.data)})   
            
        })
        .catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>
            <div className="flex gap-4">
              <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 border hover:bg-black hover:text-white rounded-lg py-2 font-medium">
                <FcGoogle className="text-xl" /> Google
              </button>
            </div>
        </div>
    );
};

export default SocialPage;