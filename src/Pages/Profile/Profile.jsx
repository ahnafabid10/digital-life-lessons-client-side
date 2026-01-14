import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { FaRegUserCircle, FaBook, FaEdit } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { CiSquarePlus } from 'react-icons/ci';
import MyFavourite from '../Dashboard/MyFavourite/MyFavourite';

const Profile = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: userProfile = [], } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/?email=${user.email}`)
            return res.data
        }
    })
    const dbUser = userProfile[0];
    const { data: lessonsData} = useQuery({
        queryKey: ['user-lessons', dbUser?._id],
        enabled: !!dbUser?._id,
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${dbUser._id}/lessons`);
          console.log("fvhfjvfjvbfj",lessonsData)
          return res.data;
        }
        
      });

      const dataLessons = lessonsData?.lessons

    const handleChangeName = (data)=>{
        const name = axiosSecure.patch(`/users/${userProfile[0]?._id}`, { name: data.name })
        return name.data
    }
    
    console.log(`userProfiledata`, userProfile)

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Profile Card */}
                <div className="card bg-base-100 shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-center relative z-10">Your Profile</h2>
                    </div>
                    
                    <div className="card-body items-center text-center -mt-16 pb-8">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 bg-base-100">
                                {userProfile[0]?.photo ? (
                                    <img src={userProfile[0]?.photo || user?.photoURL} alt="Profile" />
                                ) : (
                                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Default" />
                                )}
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mt-4 text-base-content">
                            {userProfile[0]?.name || 'Name Harai gese😭'}
                        </h3>

                        {userProfile[0]?.isPremium === true ? (
                            <div className="badge badge-lg gap-2 p-4 text-white bg-gradient-to-r from-primary to-secondary border-0 shadow-lg">
                                <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle>
                                        <polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                    </g>
                                </svg>
                                Premium ⭐
                            </div>
                        ) : (
                            <div className="badge badge-error badge-lg p-4">Free Plan</div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
                            <div className="flex items-center gap-3 bg-base-200 p-4 rounded-xl">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <FaRegUserCircle className='h-6 w-6 text-primary'/>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-base-content/60 font-medium">Name</p>
                                    <p className="text-base font-semibold text-base-content">{userProfile[0]?.name || 'name mone nai'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-base-200 p-4 rounded-xl">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <MdEmail className='h-6 w-6 text-primary'/>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-base-content/60 font-medium">Email</p>
                                    <p className="text-base font-semibold text-base-content truncate">{userProfile[0]?.email || 'email ki jani disilam'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update Name Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FaEdit className="text-2xl text-primary" />
                            </div>
                            <h2 className='text-2xl font-bold text-base-content'>Update Your Name</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    {...register('name', {required: true})} 
                                    type="text" 
                                    className="input input-bordered w-full focus:input-primary" 
                                    placeholder="Update Your name" 
                                />
                                {errors.name?.type === 'required' && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">⚠ Name field is required</span>
                                    </label>
                                )}
                            </div>
                            <button 
                                onClick={handleSubmit(handleChangeName)}
                                className='btn bg-gradient-to-r from-primary to-secondary text-white border-0 w-full md:w-auto hover:shadow-lg transition-all'>
                                <FaEdit /> Update Name
                            </button>
                        </div>
                    </div>
                </div>

                {/* My Lessons Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <FaBook className="text-2xl text-primary" />
                                </div>
                                <div>
                                    <h2 className='text-2xl font-bold text-base-content'>My Lessons</h2>
                                    <p className="text-base-content/60">Total: <span className="font-semibold text-primary">{dataLessons?.length || 0}</span></p>
                                </div>
                            </div>
                        </div>

                        {dataLessons && dataLessons.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dataLessons.map((l) => (
                                    <div
                                        key={l._id}
                                        className="card bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="card-body">
                                            <h4 className="card-title text-lg font-bold line-clamp-2">{l.title}</h4>
                                            <p className="text-white/70 text-xs mb-2">📅 {l.createAt}</p>
                                            <p className="text-sm text-white/90 line-clamp-3">{l.description.slice(0, 100)}...</p>
                                            <div className="card-actions justify-end mt-4">
                                                <Link
                                                    to={`/lessonsDetails/${l._id}`} 
                                                    className="btn btn-sm bg-white text-primary hover:bg-white/90 border-0 w-full">
                                                    View Lesson
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-base-200 rounded-xl">
                                <FaBook className="text-6xl text-base-content/20 mx-auto mb-4" />
                                <p className="text-base-content/60">No lessons yet. Start creating!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Favourites Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <MyFavourite />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;