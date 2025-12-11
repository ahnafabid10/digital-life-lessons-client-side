import React from 'react';
import { useAuth } from '../../Hooks/useAuth';

const LoadingPage = () => {
    const { loading } = useAuth()
    if(loading){
        return (
        <div className='flex items-center justify-center text-center'>
            <span class="loading loading-infinity loading-xl"></span>
        </div>
    );
    }
    
};

export default LoadingPage;