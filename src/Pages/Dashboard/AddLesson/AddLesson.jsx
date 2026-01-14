import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from "../../../Hooks/useAxiosSecure"
import { useAuth } from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaLock, FaCrown } from 'react-icons/fa';

const AddLesson = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();

    const {data: usersLesson =[]} = useQuery({
  queryKey: ['userPlan', user?.email],
  queryFn: async()=>{
    const res = await axiosSecure.get(`/users/?email=${user.email}`);
    console.log('userPlan', res.data)
    return res.data
  }
})

    const handleAddLesson = (data) => {
        console.log(data);
        const lessonData = {...data, email: user?.email, name: user?.displayName,userId: user?.uid, lastUpdate: new Date(),  mongoUserId: usersLesson[0]?._id, photo: user?.photoURL}
        toast('Lesson added successfully');

        //save data to the server
        axiosSecure.post('/lessons', lessonData)
        .then(res => {
            console.log('Lesson added', res.data);
        })

        axiosSecure.post('/favourite')
        .then(res => {
            console.log('Lesson added', res.data);
        })
    }


    return (
        <div className='min-h-screen bg-base-200 py-12 px-4'>
            {/* Header Section */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-lg">
                    <FaBook className="text-4xl text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-2">Add New Lesson</h2>
                <p className="text-base-content/60 text-lg">Share your knowledge and experiences</p>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-base-100 rounded-2xl shadow-2xl p-6 md:p-10 border border-base-200">
                    <div className="space-y-6" onSubmit={handleSubmit(handleAddLesson)}>
                        
                        {/* Lesson Title */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base flex items-center gap-2">
                                    Lesson Title
                                    <span className="text-error">*</span>
                                </span>
                            </label>
                            <input 
                                type="text" 
                                {...register('title', {required:true})} 
                                className="input input-bordered w-full focus:input-primary transition-all" 
                                placeholder="Enter your lesson title" 
                            />
                            {errors.title && (
                                <label className="label">
                                    <span className="label-text-alt text-error flex items-center gap-1">
                                        <span className="text-lg">⚠</span> Title field is required
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Category and Tone - Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base flex items-center gap-2">
                                        Category
                                        <span className="text-error">*</span>
                                    </span>
                                </label>
                                <select
                                    {...register('category', {required: true})}
                                    name="category"
                                    className="select select-bordered w-full focus:select-primary transition-all"
                                    required
                                >
                                    <option value="">Choose category</option>
                                    <option>Personal Growth</option>
                                    <option>Career</option>
                                    <option>Relationships</option>
                                    <option>Mindset</option>
                                    <option>Mistakes Learned</option>
                                </select>
                                {errors.category && (
                                    <label className="label">
                                        <span className="label-text-alt text-error flex items-center gap-1">
                                            <span className="text-lg">⚠</span> Category field is required
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Tone */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base flex items-center gap-2">
                                        Tone
                                        <span className="text-error">*</span>
                                    </span>
                                </label>
                                <select
                                    {...register('tone', {required: true})}
                                    className="select select-bordered w-full focus:select-primary transition-all"
                                    required
                                >
                                    <option value="">Choose tone</option>
                                    <option>Motivational</option>
                                    <option>Sad</option>
                                    <option>Realization</option>
                                    <option>Gratitude</option>
                                </select>
                                {errors.tone && (
                                    <label className="label">
                                        <span className="label-text-alt text-error flex items-center gap-1">
                                            <span className="text-lg">⚠</span> Tone field is required
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Privacy and Access Level - Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Privacy */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base flex items-center gap-2">
                                        <FaLock className="text-primary" size={14} />
                                        Privacy
                                        <span className="text-error">*</span>
                                    </span>
                                </label>
                                <select
                                    {...register('privacy', {required: true})}
                                    className="select select-bordered w-full focus:select-primary transition-all"
                                    required
                                >
                                    <option value="">Choose privacy</option>
                                    <option>Public</option>
                                    <option>Private</option>
                                </select>
                                {errors.privacy && (
                                    <label className="label">
                                        <span className="label-text-alt text-error flex items-center gap-1">
                                            <span className="text-lg">⚠</span> Privacy field is required
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Access Level */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-base flex items-center gap-2">
                                        <FaCrown className="text-warning" size={14} />
                                        Access Level
                                        <span className="text-error">*</span>
                                    </span>
                                </label>
                                <select
                                    {...register('accessLevel', {required: true})}
                                    className="select select-bordered w-full focus:select-primary transition-all"
                                    required
                                >
                                    {usersLesson[0]?.isPremium === true ? (
                                        <>
                                            <option value="">Choose access level</option>
                                            <option>Free</option>
                                            <option>Premium</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="">Choose access level</option>
                                            <option>Free</option>
                                            <option
                                                value="premium"
                                                disabled
                                                title="Upgrade to Premium to create paid lessons"
                                            >
                                                Premium 🔒
                                            </option>
                                        </>
                                    )}
                                </select>
                                {errors.accessLevel && (
                                    <label className="label">
                                        <span className="label-text-alt text-error flex items-center gap-1">
                                            <span className="text-lg">⚠</span> Access Level is required
                                        </span>
                                    </label>
                                )}
                                {!usersLesson[0]?.isPremium && (
                                    <label className="label">
                                        <span className="label-text-alt text-warning flex items-center gap-1">
                                            💡 Upgrade to premium to unlock paid lessons
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base flex items-center gap-2">
                                    Full Description
                                    <span className="text-error">*</span>
                                </span>
                            </label>
                            <textarea 
                                rows='8' 
                                {...register('description', {required:true})} 
                                className="textarea textarea-bordered w-full text-base leading-relaxed focus:textarea-primary transition-all resize-none" 
                                placeholder="Share your lesson details, insights, and key takeaways..."
                            />
                            {errors.description && (
                                <label className="label">
                                    <span className="label-text-alt text-error flex items-center gap-1">
                                        <span className="text-lg">⚠</span> Description field is required
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                onClick={handleSubmit(handleAddLesson)}
                                className="btn btn-lg w-full text-white font-semibold bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-[1.02] transition-all border-0">
                                <FaBook className="text-xl" />
                                Create Lesson
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-6">
                    <h3 className="font-semibold text-base-content mb-2 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        Tips for Creating Great Lessons
                    </h3>
                    <ul className="space-y-2 text-sm text-base-content/70">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Use a clear and descriptive title that captures the essence of your lesson</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Write detailed descriptions to help others understand your insights</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Choose the appropriate privacy setting based on who you want to share with</span>
                        </li>
                    </ul>
                </div>
            </div>

            <ToastContainer />  
        </div>
    );
};

export default AddLesson;