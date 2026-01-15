import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [sortOrder, setSortOrder] = useState('desc');

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    const sortedPayments = [...payments].sort((a, b) => {
        const dateA = new Date(a.paidAt);
        const dateB = new Date(b.paidAt);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                        </svg>
                        <h1 className="text-4xl font-bold text-base-content">Payment History</h1>
                    </div>
                    <p className="text-base-content/70 text-lg">
                        Total transactions: <span className="font-semibold text-primary">{payments.length}</span>
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm mb-1">Total Spent</p>
                                    <h3 className="text-3xl font-bold">৳{totalAmount.toLocaleString()}</h3>
                                </div>
                                <svg className="w-12 h-12 opacity-20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm mb-1">Total Transactions</p>
                                    <h3 className="text-3xl font-bold text-base-content">{payments.length}</h3>
                                </div>
                                <svg className="w-12 h-12 text-primary/20 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm mb-1">Average Payment</p>
                                    <h3 className="text-3xl font-bold text-base-content">
                                        ৳{payments.length > 0 ? Math.round(totalAmount / payments.length).toLocaleString() : 0}
                                    </h3>
                                </div>
                                <svg className="w-12 h-12 text-primary/20 fill-current" viewBox="0 0 24 24">
                                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
                                <svg className="w-6 h-6 text-primary fill-current" viewBox="0 0 24 24">
                                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                                </svg>
                                Transaction Details
                            </h2>
                            
                            <button 
                                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                className="btn btn-sm btn-ghost gap-2"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 6h18M7 12h10M11 18h6"/>
                                </svg>
                                Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                            </button>
                        </div>

                        {payments.length === 0 ? (
                            <div className="text-center py-16">
                                <svg className="w-20 h-20 mx-auto mb-4 text-base-content/20 fill-current" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                </svg>
                                <h3 className="text-2xl font-semibold text-base-content mb-2">
                                    No Payment History
                                </h3>
                                <p className="text-base-content/60">
                                    Your payment transactions will appear here
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr className="border-b-2 border-base-300">
                                            <th className="text-base-content font-bold">#</th>
                                            <th className="text-base-content font-bold">Name</th>
                                            <th className="text-base-content font-bold">Amount</th>
                                            <th className="text-base-content font-bold">Transaction ID</th>
                                            <th className="text-base-content font-bold">Date & Time</th>
                                            <th className="text-base-content font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedPayments.map((payment, index) => (
                                            <tr key={payment._id} className="hover:bg-base-200 transition-colors">
                                                <td className="font-semibold text-base-content/70">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-primary text-white rounded-full w-10">
                                                                <span className="text-sm">{payment.name?.charAt(0) || 'U'}</span>
                                                            </div>
                                                        </div>
                                                        <span className="font-semibold text-base-content">{payment.name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-lg badge-success text-white font-bold gap-1">
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                                                        </svg>
                                                        ৳{payment.amount}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="font-mono text-sm bg-base-200 px-3 py-1 rounded inline-block">
                                                        {payment.transactionId}
                                                    </div>
                                                </td>
                                                <td className="text-base-content/70">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                                        </svg>
                                                        {formatDate(payment.paidAt)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-info badge-sm">Completed</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;