import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../Hooks/useAuth';
import MyFavourite from '../Pages/Dashboard/MyFavourite/MyFavourite';
import { Link } from 'react-router';
import { CiSquarePlus } from 'react-icons/ci';
import UserChart from '../Pages/Dashboard/Chart/UserChart';

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log('koi theke asbe id', user?.email);
    
    const { data: userEmail = [] } = useQuery({
        queryKey: ['UserLessons'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/?email=${user.email}`);
            console.log('asbe ki?????0', res.data);
            return res.data;
        }
    });

    const dbUser = userEmail[0];

    const { data: lessonsData } = useQuery({
        queryKey: ['user-lessons', dbUser?._id],
        enabled: !!dbUser?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${dbUser._id}/lessons`);
            console.log(lessonsData);
            return res.data;
        }
    });

    const recentLessons = lessonsData?.lessons?.slice()?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))?.slice(0, 4);

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">
                        Welcome back, <span className="text-primary">{user?.displayName || 'User'}</span>
                    </h1>
                    <p className="text-base-content/70 text-lg">
                        Here's what's happening with your lessons today
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm mb-1">Total Lessons</p>
                                    <h3 className="text-4xl font-bold">{lessonsData?.lessons?.length || 0}</h3>
                                </div>
                                <svg className="w-16 h-16 opacity-20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm mb-1">Recent Lessons</p>
                                    <h3 className="text-4xl font-bold text-base-content">{recentLessons?.length || 0}</h3>
                                </div>
                                <svg className="w-16 h-16 text-primary/20 fill-current" viewBox="0 0 24 24">
                                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base-content/60 text-sm mb-1">Quick Action</p>
                                    <Link to='/dashboard/add-lesson' className="btn btn-primary btn-sm mt-2">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14"/>
                                        </svg>
                                        Add New Lesson
                                    </Link>
                                </div>
                                <svg className="w-16 h-16 text-primary/20 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Lessons Section */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <svg className="w-7 h-7 text-primary fill-current" viewBox="0 0 24 24">
                                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                            </svg>
                            <h2 className="text-3xl font-bold text-base-content">All Lessons</h2>
                        </div>
                        <span className="badge badge-primary badge-lg">{lessonsData?.lessons?.length || 0} Total</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessonsData?.lessons?.map((l) => (
                            <div
                                key={l._id}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
                                
                                <div className="card-body">
                                    <h3 className="card-title text-base-content group-hover:text-primary transition-colors">
                                        {l.title}
                                    </h3>
                                    <p className="text-base-content/60 text-sm mb-2">{l.createAt}</p>
                                    <p className="text-base-content/70 text-sm mb-4">
                                        {l.description.slice(0, 100)}...
                                    </p>

                                    <div className="card-actions flex-col gap-2">
                                        <Link
                                            to={`/lessonsDetails/${l._id}`}
                                            className="btn btn-primary w-full group-hover:btn-secondary transition-all"
                                        >
                                            View Lesson
                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </Link>
                                        <Link
                                            to={`/dashboard/update-lesson/${l._id}`}
                                            className="btn btn-ghost w-full hover:btn-primary hover:text-white transition-all"
                                        >
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                            </svg>
                                            Update Lesson
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recently Added Lessons */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <svg className="w-7 h-7 text-primary fill-current" viewBox="0 0 24 24">
                            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                        </svg>
                        <h2 className="text-3xl font-bold text-base-content">Recently Added</h2>
                        <span className="badge badge-secondary">{recentLessons?.length || 0} New</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentLessons?.map((l) => (
                            <div
                                key={l._id}
                                className="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="card-body">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="card-title text-white">{l.title}</h3>
                                        <span className="badge badge-sm bg-white text-primary">New</span>
                                    </div>
                                    <p className="text-white/80 text-sm mb-2">{l.createAt}</p>
                                    <p className="text-white/90 mb-4">{l.description.slice(0, 100)}...</p>

                                    <div className="card-actions flex-col gap-2">
                                        <Link
                                            to={`/lessonsDetails/${l._id}`}
                                            className="btn btn-ghost bg-white text-primary hover:bg-white/90 w-full"
                                        >
                                            View Lesson
                                        </Link>
                                        <Link
                                            to={`/dashboard/update-lesson/${l._id}`}
                                            className="btn btn-ghost bg-white/20 text-white hover:bg-white/30 w-full"
                                        >
                                            Update Lesson
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Favourites Section */}
                <div className="mb-10">
                    <MyFavourite />
                </div>

                {/* User Chart Section */}
                <div className="mb-10">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-7 h-7 text-primary fill-current" viewBox="0 0 24 24">
                                    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                                </svg>
                                <h2 className="text-3xl font-bold text-base-content">Analytics</h2>
                            </div>
                            <UserChart userId={dbUser?._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;