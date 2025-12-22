import React from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/Untitled file.json';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center p-4">
            <div className="card bg-white shadow-2xl max-w-md w-full">
                <div className="card-body text-center">

                    <div className="w-full mx-auto">
                        <Lottie 
                        className='w-full'
                             animationData={errorAnimation} 
                            loop={true} 
                        />
                    </div>

                    <div className="card-actions justify-center">
                        <a
                            href="/"
                            className="btn btn-primary text-white border-none px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                        >
                            Go Back Home
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
