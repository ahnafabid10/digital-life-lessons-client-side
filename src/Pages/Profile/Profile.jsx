import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { FaRegUserCircle } from 'react-icons/fa';
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
        // console.log('ehfjhfberjfberjberjbgj', data)
        return name.data

    }
    
    console.log(`userProfiledata`, userProfile)

    return (
        <div className="min-h-screen py-30 flex flex-col bg-base-200 flex items-center justify-center ">
            <div className="card w-[500px] bg-base-100 shadow-xl">
                <div className="bg-gradient-to-r from-primary to-secondary text-white py-6 rounded-t-2xl">
                    <h2 className="text-3xl font-bold text-center">Your Profile</h2>
                    
                </div>
          <div className="card-body items-center text-center -mt-10">
            <div className="avatar">
             <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            {userProfile[0]?.photo ? (
                                <img src={userProfile[0]?.photo || user?.photoURL} alt="" />
                            ) : (
                                <div className="avatar">
  <div className="rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
  </div>
</div>
                            )}
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold mt-4">{userProfile[0]?.name || 'Name Harai gese😭'}</h3>

{userProfile[0]?.isPremium === true ? <div className="badge p-2 text-white bg-primary">
  <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>
  Premium ⭐
</div> : <div className="badge badge-error">Free Plan
</div>} 

                    <div className="space-y-4 mt-6 w-full">
                        <div className="flex items-center gap-3 justify-center">
                            <FaRegUserCircle className='h-[24px] w-[24px]'/>
                            <p className="text-lg">{userProfile[0]?.name || 'name mone nai'}</p>
                        </div>

                        <div className="flex items-center gap-3 justify-center">
                            <MdEmail className='h-[24px] w-[24px]'></MdEmail>
                            <p className="text-lg">{userProfile[0]?.email || 'email ki jani disilam'}</p>
                        </div>
                    </div>
                </div>
            </div>

    <div className='my-5'>
<p className='text-2xl font-bold py-5'>Update Your Name</p>
        <form onSubmit={handleSubmit( handleChangeName)}>
             {/* name */}
          <label className="label">Name</label>
          <input
          {...register('name', {required: true})} 
          type="text" 
          className="input" 
          placeholder="Update Your name" />
          {
            errors.name?.type === 'required' && <span className="text-red-500">Name field is required</span>
          }
          <button className='btn bg-gradient-to-r from-primary to-secondary text-white border-t mt-3'>Submit</button>
        </form>
    </div>

    <div className='w-7/12 mt-15'>
        <h2 className='text-2xl font-bold '>Total Lessons: {dataLessons?.length}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2  my-10 gap-6 ">
  {dataLessons?.map((l) => (
    <div
      key={l._id}
      className="p-4 border rounded-lg bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30 shadow hover:shadow-lg transition"
    >
      <h4 className="text-lg font-semibold">{l.title}</h4>
      <p className="text-gray-400 text-sm mb-2">{l.createAt}</p>
      <p>{l.description.slice(0, 100)}...</p>
      <Link
      to={`/lessonsDetails/${l._id}`} className="btn my-2 w-full bg-white text-purple-800">View Lesson</Link>
    </div>
  ))}
 
  

      </div>
      
    </div>
    <div className='w-7/10'>
  <MyFavourite></MyFavourite>
    </div>
    
        
    
        </div>
    );
};

export default Profile;