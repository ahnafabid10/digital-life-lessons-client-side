import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../Hooks/useAuth';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import axios from 'axios';

const AdminProfile = () => {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const { user,  } = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: userProfile = [], refetch} = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/?email=${user.email}`)
            return res.data
        }
    })

        const handleChange = (data)=>{
        const name = axiosSecure.patch(`/users/${userProfile[0]?._id}`, { name: data.name })
        // console.log('ehfjhfberjfberjberjbgj', data)

        const profileImg = data.photo[0];
        const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_hosting_key}`;

      axios.post(image_API_URL, formData)
        .then((imgRes) => {
          const photoURL = imgRes.data.data.url;
          console.log("ghtghghgtg",photoURL)
          //update user profi;e
        //   const userProfile = {
        //     displayName: data.name,
        //     photoURL: photoURL,
        //   };

        axiosSecure.patch(`/users/${userProfile[0]._id}`, {name: data.name,photo: photoURL})
                  refetch()
        


    //   updateUserProfile(userProfile)
    //         .then(() => {
    //           console.log("Firebase profile updated with name and photo");
              
    //             .catch((err) => console.log(err));
    //         })

        })

        return name.data

    }

    console.log("userPhoto", userProfile)

    return (
        <div className="min-h-screen py-30 flex flex-col bg-base-200 flex items-center justify-center">
           <div className="card w-[500px] bg-base-100 shadow-xl">
                           <div className="bg-gradient-to-r from-primary to-secondary text-white py-6 rounded-t-2xl">
                               <h2 className="text-3xl font-bold text-center">Admin Profile</h2>
                               
                           </div>
                     <div className="card-body items-center text-center -mt-10">
                       <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                       {userProfile[0]?.photo ? (
                                           <img src={userProfile[0]?.photo} alt="" />
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
           
           <div className="badge p-2 text-white bg-primary">
             <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></polyline></g></svg>Role: {userProfile[0]?.role}
           </div> 
           
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
        <form onSubmit={handleSubmit( handleChange)}>
             {/* name */}
             <div className='flex flex-col'>
<div>
 <label className="label">Name</label>
          <input
          {...register('name', {required: true})} 
          type="text" 
          className="input" 
          placeholder="Update Your name" />
          {
            errors.name?.type === 'required' && <span className="text-red-500">Name field is required</span>
          }
             </div>
         
         <div>
<label className="label">Photo</label>
          <input
          {...register('photo', {required: true})}  
          type="file" 
          className="file-input" />
          {
            errors.photo?.type === 'required' && <span className="text-red-500">Photo field is required</span>
          }

         </div>

           
          <button className='btn bg-gradient-to-r from-primary to-secondary text-white border-t mt-3'>Submit</button>
             </div>
             
        </form>
    </div> 
        </div>
    );
};

export default AdminProfile;