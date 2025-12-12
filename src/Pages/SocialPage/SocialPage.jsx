import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../Hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const SocialPage = () => {
    const {googleSignIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(res=>{
            console.log(res.user);
            navigate( location?.state || '/');
            
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