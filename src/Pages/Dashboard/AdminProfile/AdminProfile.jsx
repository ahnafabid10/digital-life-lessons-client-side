import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../Hooks/useAuth';
import { FaRegUserCircle, FaCrown, FaCamera, FaEdit } from 'react-icons/fa';
import { MdEmail, MdVerified } from 'react-icons/md';
import axios from 'axios';

const AdminProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: userProfile = [], refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/?email=${user.email}`);
            return res.data;
        }
    });

    const handleChange = (data) => {
        const name = axiosSecure.patch(`/users/${userProfile[0]?._id}`, { name: data.name });

        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_hosting_key}`;

        axios.post(image_API_URL, formData)
            .then((imgRes) => {
                const photoURL = imgRes.data.data.url;
                axiosSecure.patch(`/users/${userProfile[0]._id}`, { name: data.name, photo: photoURL });
                refetch();
            });

        return name.data;
    };

    const onSubmit = (data) => {
        handleChange(data);
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center gap-3">
                        <FaCrown className="text-primary" />
                        Admin Profile
                    </h1>
                    <p className="text-base-content/60">
                        Manage your profile information and settings
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card - Left Side */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body items-center text-center p-8">
                                {/* Profile Picture */}
                                <div className="relative mb-4">
                                    <div className="avatar">
                                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                            {userProfile[0]?.photo ? (
                                                <img src={userProfile[0]?.photo} alt="Profile" />
                                            ) : (
                                                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Default" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                                        <FaCamera className="text-lg" />
                                    </div>
                                </div>

                                {/* Name */}
                                <h3 className="text-2xl font-bold text-base-content">
                                    {userProfile[0]?.name || 'Admin User'}
                                </h3>

                                {/* Role Badge */}
                                <div className="badge badge-primary badge-lg gap-2 mt-2">
                                    <MdVerified className="text-lg" />
                                    {userProfile[0]?.role || 'Admin'}
                                </div>

                                {/* Divider */}
                                <div className="divider my-4"></div>

                                {/* Contact Info */}
                                <div className="space-y-4 w-full">
                                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                        <FaRegUserCircle className="h-6 w-6 text-primary" />
                                        <div className="text-left flex-1">
                                            <p className="text-xs text-base-content/60">Username</p>
                                            <p className="text-sm font-medium text-base-content">
                                                {userProfile[0]?.name || 'Not set'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                        <MdEmail className="h-6 w-6 text-primary" />
                                        <div className="text-left flex-1">
                                            <p className="text-xs text-base-content/60">Email Address</p>
                                            <p className="text-sm font-medium text-base-content break-all">
                                                {userProfile[0]?.email || 'Not available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Form - Right Side */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <FaEdit className="text-2xl text-primary" />
                                    <h2 className="text-2xl font-bold text-base-content">Update Profile</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <div className="w-full">
                                        <label className="label">
                                            <span className="label-text text-base font-semibold flex items-center gap-2">
                                                <FaRegUserCircle className="text-primary" />
                                                Full Name
                                            </span>
                                        </label>
                                        <input
                                            {...register('name', { required: true })}
                                            type="text"
                                            className="input input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name?.type === 'required' && (
                                            <label className="label">
                                                <span className="label-text-alt text-error flex items-center gap-1">
                                                    <span>⚠</span> Name field is required
                                                </span>
                                            </label>
                                        )}
                                    </div>

                                    {/* Photo Field */}
                                    <div className="w-full">
                                        <label className="label">
                                            <span className="label-text text-base font-semibold flex items-center gap-2">
                                                <FaCamera className="text-primary" />
                                                Profile Photo
                                            </span>
                                        </label>
                                        <input
                                            {...register('photo', { required: true })}
                                            type="file"
                                            className="file-input file-input-bordered w-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                            accept="image/*"
                                        />
                                        {errors.photo?.type === 'required' && (
                                            <label className="label">
                                                <span className="label-text-alt text-error flex items-center gap-1">
                                                    <span>⚠</span> Photo field is required
                                                </span>
                                            </label>
                                        )}
                                        <label className="label">
                                            <span className="label-text-alt text-base-content/60">
                                                Supported formats: JPG, PNG, GIF (Max 5MB)
                                            </span>
                                        </label>
                                    </div>

                                    {/* Current Profile Preview */}
                                    {userProfile[0]?.photo && (
                                        <div className="w-full">
                                            <label className="label">
                                                <span className="label-text text-base font-semibold">Current Photo</span>
                                            </label>
                                            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src={userProfile[0]?.photo} alt="Current" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-base-content">Current profile picture</p>
                                                    <p className="text-xs text-base-content/60">This will be replaced when you upload a new photo</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="w-full mt-8">
                                        <button 
                                            onClick={handleSubmit(onSubmit)}
                                            className="btn btn-primary btn-lg w-full gap-2 hover:scale-[1.02] transition-transform"
                                        >
                                            <FaEdit />
                                            Update Profile
                                        </button>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="alert alert-info mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>Your profile changes will be visible immediately after updating.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;