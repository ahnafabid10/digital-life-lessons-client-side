import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import SocialPage from "../Pages/SocialPage/SocialPage";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Register = () => {

  const axiosSecure = useAxiosSecure()

  const {registerUser, updateUserProfile} = useAuth()

  const [showPass, setShowPass] = useState(false);

  const location = useLocation();

  const navigate = useNavigate()

  const handleShowPassword = (e)=>{
        e.preventDefault()
        setShowPass(!showPass)
    }

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()

  const handleRegister = (data)=>{

    const profileImg = data.photo[0]

    registerUser({email: data.email, password: data.password})
    .then(res=>{
      console.log(res.user)
      const formData = new FormData();
      formData.append('image', profileImg)
      const image_API_URL =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_hosting_key}`

         axiosSecure.post('/users', {name: res.user.displayName, email: res.user.email, userId:res.user.uid, isPremium: false})
         .then(res=>{
          console.log('added user info', res.data)
         })
          
       axios.post(image_API_URL, formData,)
      .then(res=>{
        console.log('after image Upload', res.data)
      })

      

      //update user profile

      const userProfile = {
        displayName: data.name,
        photoURL: res.data.data.url
      }
      updateUserProfile(userProfile)
      .then(()=>{
        console.log('user profile updated')
        navigate(location?.state || '/')
      })
      .catch(error => console.log(error))


    })
    .catch(error=>{
      console.log(error)
    })
    
  }

//   const handleRegister = (data) => {
//   const profileImg = data.photo[0];

//   registerUser({ email: data.email, password: data.password })
//     .then((res) => {
//       console.log(res.user);

//       const formData = new FormData();
//       formData.append('image', profileImg);
//       const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_hosting_key}`;

//       // 1️⃣ Upload image first
//       axios.post(image_API_URL, formData)
//         .then((imgRes) => {
//           console.log('after image Upload', imgRes.data);

//           const photoURL = imgRes.data.data.url;

//           // 2️⃣ Save user info to backend
//           axiosSecure.post('/users', {
//             name: data.name,
//             email: data.email,
//             photo: photoURL,
//             isPremium: false
//           })
//           .then((res) => {
//             console.log('added user info', res.data);

//             // 3️⃣ Update Firebase profile
//             const userProfile = {
//               displayName: data.name,
//               photoURL: photoURL
//             };

//             updateUserProfile(userProfile)
//               .then(() => {
//                 console.log('user profile updated');
//                 navigate(location?.state?.from?.pathname || '/');
//               })
//               .catch(error => console.log(error));
//           })
//           .catch(error => console.log('Backend error:', error));
//         })
//         .catch(error => console.log('Image upload error:', error));
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };


  return (
    <div className="hero bg-base-200 min-h-screen">
      
  <div className="hero-content w-full md:w-[500px] flex-col lg:flex-row-reverse">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="p-5">
        <h2 className="text-center text-5xl font-bold mb-5">Join us today!</h2>
        <p className=' text-center'>Sing up now to become a member.</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleRegister)}>
          
          <fieldset className="fieldset">
            {/* name */}
          <label className="label">Name</label>
          <input
          {...register('name', {required: true})} 
          type="text" 
          className="input" 
          placeholder="Your name" />
          {
            errors.name?.type === 'required' && <span className="text-red-500">Name field is required</span>
          }

          {/* photo */}
          <label className="label">Photo</label>
          <input
          {...register('photo', {required: true})}  
          type="file" 
          className="file-input" />
          {
            errors.photo?.type === 'required' && <span className="text-red-500">Photo field is required</span>
          }

          {/* email */}
          <label className="label">Email</label>
          <input 
          {...register('email', {required: true})} 
          type="email" 
          className="input" 
          placeholder="Email" />
          {
            errors.email?.type === 'required' && <span className="text-red-500">Email field is required</span>
          }

          {/* password */}
          <label className="label">Password</label>
          <div className='flex items-center'>
            <input 
            {...register('password', {required: true, minLength: 6 ,  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/})} 
            type={showPass ? "text" : "password"} 
            name='password' 
            className="input" 
            placeholder="Password" />
          <div onClick={handleShowPassword} className="btn btn-xs absolute  right-12 ">{showPass ?  <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</div>
          </div>
          {
            errors.password?.type === 'required' && <span className="text-red-500">Password field is required</span>
          }
          {
            errors.password?.type === 'minLength' && <span className="text-red-500">Password must be at least 6 characters</span>
          }
          {
            errors.password?.type === 'pattern' && <span className="text-red-500">Password must contain one uppercase letter, one special character, at least 8 characters.</span>
          }

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn bg-gradient-to-r py-3 rounded-lg font-semibold hover:opacity-90 transition from-primary to-secondary text-white mt-4">Sign Up</button>
        </fieldset>
        <p className="text-center text-sm mt-4">
           <span> Already a member? <Link
           state={location.pathname}
           to='/login' className="text-purple-600 font-medium hover:underline">Login Here</Link></span>
         </p>
        </form>
        

        <p className="text-center my-3 text-gray-500 text-sm">Or With</p>

            {/* google */}
        <SocialPage></SocialPage>
      </div>
    </div>
  </div>
</div>
  );
};

export default Register;
