import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../../Hooks/useAuth';

const UpdateLessons = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {_id} = useParams()
 const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${_id}`);
      return res.data;
    },
  });

   const { data: mongoUser } = useQuery({
    queryKey: ['mongoUser', user?.email],
     
    queryFn: async () => {
        if (!user?.email) return null;
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data[0]; 
    },
  });

  console.log('mongodbuser', mongoUser)

  const handleUpdate = async (data) => {
    const res = await axiosSecure.put(`/lessons/${_id}`, data);
    console.log('Updated:', res.data);
    if(res.data.modifiedCount){
        toast('update successful')
    }
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

    



    return (
        <div>
            <div className='mb-30'>
            <h2 className="text-5xl text-center my-10 font-bold">Add Lessons</h2>
            <div className="w-3/4 md:w-5/12 mx-auto my-10">
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div>
                    <fieldset className="fieldset">

          <label className="label">Lesson Title</label>
          <input type="text" {...register('title', {required:true})} defaultValue={lesson.title} className="input w-full" placeholder="Lesson Title" />
          {
            errors.title && <span className="text-red-500">Title field is required</span>
          }
          

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
            {...register('category', {required: true})}
              name="category"
              className="select select-bordered w-full"
              required
              defaultValue={lesson.category}
            >
              <option value="">Choose category</option>
                <option>Personal Growth</option>
                <option>Career</option>
                <option>Relationships</option>
                <option>Mindset</option>
                <option>Mistakes Learned</option>
            </select>
            {
                errors.category && <span className="text-red-500">Category field is required</span>
            }
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Tone</span>
            </label>
            <select
            {...register('tone', {required: true})}
              className="select select-bordered w-full"
              required
              defaultValue={lesson.tone}
            >
                <option value="">Choose category</option>
                <option>Motivational</option>
                <option>Sad</option>
                <option>Realization</option>
                <option>Gratitude</option>
            </select>
            {
                errors.tone && <span className="text-red-500">Tone field is required</span>
            }
          </div>


          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Privacy</span>
            </label>
            <select
            {...register('privacy', {required: true})}
              className="select select-bordered w-full"
              required
              defaultValue={lesson.privacy}
            >
              <option value="">Choose category</option>
              <option>Public</option>
                <option>Private</option>

            </select>
            {
                errors.privacy && <span className="text-red-500">Privacy field is required</span>
            }
          </div>

            {/* Access Level */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Access Level</span>
            </label>
            <select
            {...register('accessLevel', {required: true})}
              className="select select-bordered w-full"
              required
            defaultValue={lesson.accessLevel}
            >

              {
                mongoUser?.isPremium === true ? <div>
                  <option value="">Choose category</option>
              <option>Free</option>
                <option>Premium</option>
                </div>
                :
                <div>
                  <option value="">Choose category</option>
                  <option>Free</option>
                  <option
                   value="premium"
                   disabled
                   title="Upgrade to Premium to create paid lessons">Premium 🔒</option>
                </div>
              }
              
            </select>
            {
                errors.accessLevel && <span className="text-red-500">Access Level is required</span>
            }
          </div>


          <label className="label">Full Description</label>
          <textarea rows='6' cols='50' type="text" {...register('description', {required:true})} className="border text-lg p-2 border-gray-400 w-full rounded-lg" defaultValue={lesson.description} placeholder="Description" />
          {
            errors.description && <span className="text-red-500">Description field is required</span>
          }


          <button className="btn text-white mt-4 bg-gradient-to-r from-primary to-secondary">Submit</button>
        </fieldset>
                </div>
            </form>
            </div>
            <ToastContainer />  
        </div>
        </div>
    );
};

export default UpdateLessons;