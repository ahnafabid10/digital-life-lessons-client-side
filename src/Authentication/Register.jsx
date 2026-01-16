import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaRegUserCircle, FaEnvelope, FaLock, FaImage, FaUserPlus } from "react-icons/fa";
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
    formState: { errors },
  } = useForm()


  const handleRegister = (data) => {
  const profileImg = data.photo[0];

  registerUser({ email: data.email, password: data.password })
    .then((res) => {
      console.log("Firebase user created:", res.user);

      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_hosting_key}`;

      axios.post(image_API_URL, formData)
        .then((imgRes) => {
          const photoURL = imgRes.data.data.url;
          
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
        


      updateUserProfile(userProfile)
            .then(() => {
              console.log("Firebase profile updated with name and photo");

              axiosSecure.post("/users", {name: data.name, email: data.email,photo: photoURL, userId: res.user.uid, isPremium: false,
                })
                .then((res) => {
                  console.log( res.data);
                  navigate("/");
                })
                .catch((err) => console.log(err));
            })

        })
    })
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-3 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4">
            <FaUserPlus className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Join Us Today!</h1>
          <p className="text-white text-opacity-90 text-lg">Sign up now to become a member</p>
        </div>

        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-8">
            <div>
              
              <fieldset className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2 flex items-center gap-2">
                    <FaRegUserCircle className="text-primary" />
                    Name
                  </label>
                  <input
                    {...register('name', {required: true})} 
                    type="text" 
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors duration-200" 
                    placeholder="Enter your full name" />
                  {errors.name?.type === 'required' && (
                    <p className="text-error text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> Name is required
                    </p>
                  )}
                </div>

                {/* Photo Field */}
                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2 flex items-center gap-2">
                    <FaImage className="text-primary" />
                    Profile Photo
                  </label>
                  <input
                    {...register('photo', {required: true})}  
                    type="file" 
                    className="file-input file-input-bordered w-full bg-base-200 focus:bg-base-100" />
                  {errors.photo?.type === 'required' && (
                    <p className="text-error text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> Photo is required
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-primary" />
                    Email Address
                  </label>
                  <input 
                    {...register('email', {required: true})} 
                    type="email" 
                    className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors duration-200" 
                    placeholder="your.email@example.com" />
                  {errors.email?.type === 'required' && (
                    <p className="text-error text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> Email is required
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-base-content mb-2 flex items-center gap-2">
                    <FaLock className="text-primary" />
                    Password
                  </label>
                  <div className="relative">
                    <input 
                      {...register('password', {
                        required: true, 
                        minLength: 6,  
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
                      })} 
                      type={showPass ? "text" : "password"} 
                      name="password" 
                      className="input input-bordered w-full bg-base-200 focus:bg-base-100 transition-colors duration-200 pr-12" 
                      placeholder="Create a strong password" />
                    <button 
                      type="button"
                      onClick={handleShowPassword} 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-sm btn-circle hover:bg-base-300">
                      {showPass ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                    </button>
                  </div>
                  {errors.password?.type === 'required' && (
                    <p className="text-error text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> Password is required
                    </p>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <p className="text-error text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> Password must be at least 6 characters
                    </p>
                  )}
                  {errors.password?.type === 'pattern' && (
                    <p className="text-error text-sm mt-1 flex items-center gap-1">
                      <span>⚠</span> Must contain uppercase, lowercase, number & special character
                    </p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <a className="link link-hover text-sm text-primary font-medium">Forgot password?</a>
                </div>

                {/* Submit Button */}
                <button 
                  type="button"
                  onClick={handleSubmit(handleRegister)}
                  className="btn w-full bg-gradient-to-r from-primary to-secondary text-white border-none text-lg font-semibold py-3 h-auto hover:scale-[1.02] hover:shadow-xl transition-all duration-200">
                  <FaUserPlus className="text-xl" />
                  Create Account
                </button>
              </fieldset>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-base-content text-opacity-70">
                  Already a member?{' '}
                  <Link
                    state={location.pathname}
                    to="/login" 
                    className="text-primary font-semibold hover:underline transition-all">
                    Login Here
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="divider text-base-content text-opacity-50 text-sm my-6">Or continue with</div>

              {/* Social Login */}
              <SocialPage />
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white text-opacity-70 text-sm mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;