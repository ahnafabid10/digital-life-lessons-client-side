import React from 'react';
import { useAuth } from '../../Hooks/useAuth';

const LoadingPage = () => {
    const { loading } = useAuth()
    if (!loading) {return null};


        return (
            <div className='h-screen flex items-center justify-center text-center'>
                <span className="loading loading-infinity loading-xl" />
            </div>
        );
    };

export default LoadingPage;