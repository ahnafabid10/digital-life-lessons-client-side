import React from 'react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center p-4">
            <div className="card bg-white shadow-2xl max-w-md w-full">
                <div className="card-body text-center">
                    <div className="mb-4">
                        <h1 className="text-9xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-bounce">
                            404
                        </h1>
                    </div>
                    <h2 className="card-title text-4xl text-gray-800 mx-auto mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                        Oops! The page you're looking for seems to have taken a wrong turn.
                    </p>
                    <div className="divider my-4 before:bg-gradient-to-r before:from-primary before:to-secondary after:bg-gradient-to-r after:from-primary after:to-secondary"></div>
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