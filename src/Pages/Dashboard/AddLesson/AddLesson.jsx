import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const AddLesson = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const handleAddLesson = (data) => {
        console.log(data);
        toast('Lesson added successfully');
    }


    return (
        <div className='mb-30'>
            <h2 className="text-5xl text-center my-10 font-bold">Add Lessons</h2>
            <div className="w-3/4 md:w-5/12 mx-auto my-10">
            <form onSubmit={handleSubmit(handleAddLesson)}>
                <div>
                    <fieldset className="fieldset">

          <label className="label">Lesson Title</label>
          <input type="text" {...register('title', {required:true})} className="input w-full" placeholder="Lesson Title" />
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
            >
              <option value="">Choose category</option>
              <option>Public</option>
                <option>Private</option>
            </select>
            {
                errors.privacy && <span className="text-red-500">Privacy field is required</span>
            }
          </div>


          <label className="label">Full Description</label>
          <textarea rows='6' cols='50' type="text" {...register('description', {required:true})} className="border text-lg p-2 border-gray-400 w-full rounded-lg" placeholder="Description" />
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
    );
};

export default AddLesson;