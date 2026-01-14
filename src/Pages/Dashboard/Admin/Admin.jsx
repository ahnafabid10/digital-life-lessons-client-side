import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Legend, Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FaUsers, FaBook, FaExclamationTriangle, FaCalendarDay, FaTrophy, FaChartPie } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';

const Admin = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: totalUsers = [] } = useQuery({
        queryKey: ["totalUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: totalPublicLessons = [] } = useQuery({
        queryKey: ["totalPubLess"],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data;
        }
    });

    const { data: totalReportLessons = [] } = useQuery({
        queryKey: ["totalRepLess"],
        queryFn: async () => {
            const res = await axiosSecure.get('/reportLessons');
            return res.data;
        }
    });

    const { data: todaysLessons = { count: 0 } } = useQuery({
        queryKey: ['todaysLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons/today-count');
            return res.data;
        }
    });

    const { data: topContributors = [] } = useQuery({
        queryKey: ['topContributors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons/top-contributors');
            return res.data;
        }
    });

    const pieData = [
        { name: "Users", value: totalUsers.length, color: "#6C4BCF" },
        { name: "Public Lessons", value: totalPublicLessons.length, color: "#4B3F72" },
        { name: "Reported Lessons", value: totalReportLessons.length, color: "#ef4444" }
    ];

    const COLORS = ['#6C4BCF', '#4B3F72', '#ef4444'];

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center gap-3">
                        <FaChartPie className="text-primary" />
                        Admin Dashboard
                    </h1>
                    <p className="text-base-content/60">
                        Overview of platform statistics and activity
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Users Card */}
                    <div className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg border border-primary/20 hover:shadow-xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium mb-1">Total Users</p>
                                    <h3 className="text-3xl font-bold text-primary">{totalUsers.length}</h3>
                                    <p className="text-base-content/50 text-xs mt-1">Registered accounts</p>
                                </div>
                                <div className="bg-primary/20 p-4 rounded-2xl">
                                    <FaUsers className="text-3xl text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Public Lessons Card */}
                    <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg border border-secondary/20 hover:shadow-xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium mb-1">Public Lessons</p>
                                    <h3 className="text-3xl font-bold text-secondary">{totalPublicLessons.length}</h3>
                                    <p className="text-base-content/50 text-xs mt-1">Available content</p>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded-2xl">
                                    <FaBook className="text-3xl text-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reported Lessons Card */}
                    <div className="card bg-gradient-to-br from-error/10 to-error/5 shadow-lg border border-error/20 hover:shadow-xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium mb-1">Reported Lessons</p>
                                    <h3 className="text-3xl font-bold text-error">{totalReportLessons.length}</h3>
                                    <p className="text-base-content/50 text-xs mt-1">Needs review</p>
                                </div>
                                <div className="bg-error/20 p-4 rounded-2xl">
                                    <FaExclamationTriangle className="text-3xl text-error" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Today's Lessons Card */}
                    <div className="card bg-gradient-to-br from-success/10 to-success/5 shadow-lg border border-success/20 hover:shadow-xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm font-medium mb-1">Today's Lessons</p>
                                    <h3 className="text-3xl font-bold text-success">{todaysLessons.count}</h3>
                                    <p className="text-base-content/50 text-xs mt-1 flex items-center gap-1">
                                        <MdTrendingUp className="text-success" />
                                        New today
                                    </p>
                                </div>
                                <div className="bg-success/20 p-4 rounded-2xl">
                                    <FaCalendarDay className="text-3xl text-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart Section */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-base-content mb-4 flex items-center gap-2">
                                <FaChartPie className="text-primary" />
                                Platform Distribution
                            </h2>
                            <div className="w-full h-[350px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            animationBegin={0}
                                            animationDuration={800}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--b1))',
                                                border: '1px solid hsl(var(--bc) / 0.2)',
                                                borderRadius: '0.5rem'
                                            }}
                                        />
                                        <Legend 
                                            verticalAlign="bottom" 
                                            height={36}
                                            iconType="circle"
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Top Contributors Section */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title text-base-content mb-4 flex items-center gap-2">
                                <FaTrophy className="text-warning" />
                                Most Active Contributors
                            </h2>
                            <div className="space-y-3">
                                {topContributors.length > 0 ? (
                                    topContributors.map((user, idx) => (
                                        <div 
                                            key={idx} 
                                            className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-base-content">{user.email}</p>
                                                    <p className="text-sm text-base-content/60">Contributor</p>
                                                </div>
                                            </div>
                                            <div className="badge badge-primary badge-lg gap-2">
                                                <FaBook className="text-xs" />
                                                {user.lessonCount} lessons
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-base-content/60">
                                        <FaTrophy className="text-4xl mx-auto mb-2 text-base-content/20" />
                                        <p>No contributors data available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Summary */}
                <div className="card bg-base-100 shadow-lg mt-6">
                    <div className="card-body">
                        <h2 className="card-title text-base-content mb-4">Quick Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title text-base-content/60">Average Lessons per User</div>
                                <div className="stat-value text-primary">
                                    {totalUsers.length > 0 
                                        ? (totalPublicLessons.length / totalUsers.length).toFixed(1)
                                        : 0
                                    }
                                </div>
                                <div className="stat-desc text-base-content/50">Total lessons / users</div>
                            </div>
                            
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title text-base-content/60">Report Rate</div>
                                <div className="stat-value text-error">
                                    {totalPublicLessons.length > 0
                                        ? ((totalReportLessons.length / totalPublicLessons.length) * 100).toFixed(1)
                                        : 0
                                    }%
                                </div>
                                <div className="stat-desc text-base-content/50">Reported vs total lessons</div>
                            </div>
                            
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title text-base-content/60">Platform Health</div>
                                <div className="stat-value text-success">
                                    {totalReportLessons.length < totalPublicLessons.length * 0.1 ? 'Excellent' : 'Good'}
                                </div>
                                <div className="stat-desc text-base-content/50">Based on report rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;