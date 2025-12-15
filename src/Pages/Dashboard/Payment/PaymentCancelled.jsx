import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FaTimesCircle, FaRedoAlt, FaHome, FaEnvelope } from 'react-icons/fa';

const PaymentCancelled = ({ reason }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-10 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="rounded-full bg-red-50 p-4">
                            <FaTimesCircle className="text-red-600" size={48} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                    <p className="text-gray-600 mb-6">Your payment was not completed. No charges were made.</p>

                    {reason && (
                        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded text-sm text-red-700">
                            <strong>Reason:</strong> {reason}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <Link
                            to="/pricing"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow"
                        >
                            <FaRedoAlt /> Try Again
                        </Link>

                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95"
                        >
                            <FaHome /> Return Home
                        </button>

                        <a
                            href="mailto:support@example.com?subject=Payment%20cancelled"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 hover:shadow"
                        >
                            <FaEnvelope /> Contact Support
                        </a>
                    </div>

                    <p className="text-sm text-gray-500">If you were charged incorrectly, contact support and include your order details.</p>
                </div>

                <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
                    <span className="mr-2">Need help?</span>
                    <a className="text-primary font-medium">support@digitallife.com</a>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;