import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FaCheckCircle, FaShareAlt} from 'react-icons/fa';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-10 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="rounded-full bg-green-50 p-4">
                            <FaCheckCircle className="text-green-600" size={48} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful</h1>
                    <p className="text-gray-600 mb-6">Thank you — your purchase is complete. You now have lifetime access to Premium features.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="col-span-2 text-left">
                            <div className="text-sm text-gray-500">Order</div>
                            <div className="font-medium text-gray-900">Premium Lifetime Access</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Amount</div>
                            <div className="font-medium text-gray-900">৳1500</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">

                        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95" onClick={() => navigate('/')}>
                            Continue to Dashboard
                        </button>

                        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:shadow" onClick={() => navigator.share ? navigator.share({ title: 'I upgraded to Premium', text: 'I got lifetime access on Digital Life Lessons!', url: window.location.href }).catch(() => { }) : alert('Share not supported')}>
                            <FaShareAlt /> Share
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">
                    If you have any questions, contact support at <a className="text-primary font-medium" >support@digitallife.com</a>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;