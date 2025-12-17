import React from 'react';
import { useNavigate } from 'react-router';
import { FaBan, FaHome, FaEnvelope } from 'react-icons/fa';

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-10 text-center">
                    <div className="mx-auto w-28 h-28 rounded-full bg-red-50 flex items-center justify-center mb-6">
                        <FaBan className="text-red-600" size={44} />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-6">You don't have permission to view this page. If you think this is an error, contact support or request access.</p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow"
                        >
                            <FaHome /> Go Back
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95"
                        >
                            Home
                        </button>

                        <a
                            href="mailto:support@example.com?subject=Access%20request"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 hover:shadow"
                        >
                            <FaEnvelope /> Contact Support
                        </a>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">
                    <strong>Tip:</strong> If you're signed in, ask your administrator to grant access.
                </div>
            </div>
        </div>
    );
};

export default Forbidden;