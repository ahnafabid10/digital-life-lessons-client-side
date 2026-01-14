import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserShield, FaUsers, FaBook, FaCrown } from 'react-icons/fa';
import { FiShieldOff, FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: lessonsCreated = [] } = useQuery({
        queryKey: ['lessonsCreated'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons/users-lesson/stats`);
            return res.data;
        }
    });

    // Filter users based on search
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} marked as Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleRemoveAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make this user a ${user.role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const roleInfo = { role: 'user' };
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: `User role updated to ${user.role}.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const totalLessons = lessonsCreated.reduce((sum, stat) => sum + stat.count, 0);
    const adminCount = users.filter(u => u.role === 'admin').length;

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center gap-3">
                        <FaUsers className="text-primary" />
                        User Management
                    </h1>
                    <p className="text-base-content/60">
                        Manage user roles and monitor platform activity
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg border border-primary/20">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium">Total Users</p>
                                    <h3 className="text-3xl font-bold text-primary mt-1">{users.length}</h3>
                                </div>
                                <div className="bg-primary/20 p-4 rounded-2xl">
                                    <FaUsers className="text-3xl text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg border border-secondary/20">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium">Administrators</p>
                                    <h3 className="text-3xl font-bold text-secondary mt-1">{adminCount}</h3>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded-2xl">
                                    <FaCrown className="text-3xl text-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-success/10 to-success/5 shadow-lg border border-success/20">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium">Total Lessons</p>
                                    <h3 className="text-3xl font-bold text-success mt-1">{totalLessons}</h3>
                                </div>
                                <div className="bg-success/20 p-4 rounded-2xl">
                                    <FaBook className="text-3xl text-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="card bg-base-100 shadow-lg mb-6">
                    <div className="card-body p-4">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 text-xl" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="input input-bordered w-full pl-12 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body p-0">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead className="bg-base-200">
                                    <tr>
                                        <th className="text-base-content font-semibold">#</th>
                                        <th className="text-base-content font-semibold">Name</th>
                                        <th className="text-base-content font-semibold">Email</th>
                                        <th className="text-base-content font-semibold">Total Lessons</th>
                                        <th className="text-base-content font-semibold">Role</th>
                                        <th className="text-base-content font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-base-200/50 transition-colors">
                                            <th className="text-base-content/70">{index + 1}</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar placeholder">
                                                        <div className="bg-primary text-primary-content rounded-full w-10">
                                                            <span className="text-sm">{user.name?.charAt(0)}</span>
                                                        </div>
                                                    </div>
                                                    <span className="font-medium text-base-content">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-base-content/70">{user.email}</td>
                                            <td>
                                                <div className="badge badge-primary badge-outline">
                                                    {lessonsCreated.find(stat => stat._id === user._id.toString())?.count ?? 0} lessons
                                                </div>
                                            </td>
                                            <td>
                                                {(typeof user.role === 'string' ? user.role : user.role?.role) === 'admin' ? (
                                                    <div className="badge badge-secondary gap-2">
                                                        <FaCrown className="text-xs" />
                                                        Admin
                                                    </div>
                                                ) : (
                                                    <div className="badge badge-ghost gap-2">
                                                        <FaUsers className="text-xs" />
                                                        User
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                {user.role === 'admin' ? (
                                                    <button
                                                        onClick={() => handleRemoveAdmin(user)}
                                                        className="btn btn-sm btn-error btn-outline gap-2 hover:scale-105 transition-transform"
                                                    >
                                                        <FiShieldOff />
                                                        Remove Admin
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-sm btn-success btn-outline gap-2 hover:scale-105 transition-transform"
                                                    >
                                                        <FaUserShield />
                                                        Make Admin
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* No Results */}
                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center">
                                <FiSearch className="text-6xl text-base-content/20 mx-auto mb-4" />
                                <p className="text-base-content/60 text-lg">No users found matching your search</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;