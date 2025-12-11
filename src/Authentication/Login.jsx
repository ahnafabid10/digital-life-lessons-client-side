import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
   const [showPass, setShowPass] = useState(false);
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

      const handleLogin = (data)=>{
        console.log(data)
      }


  return (
       <div className="hero bg-base-200 min-h-screen">
          
      <div className="hero-content w-full md:w-[500px] flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="p-5">
            <h2 className="text-center text-5xl font-bold mb-5">Please Login</h2>
            
          </div>
          <div className="card-body">
            
            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
              <label className="label">Email</label>
              <input {...register('email', {required: true})} type="email" className="input" placeholder="Email" />
              {
            errors.email?.type === 'required' && <span className="text-red-500">Email field is required</span>
          }
              <label className="label">Password</label>
              <div className="flex items-center">
              <input {...register('password', {required: true, minLength: 6 ,  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/})}  type={showPass ? "text" : "password"} name='password' className="input" placeholder="Password" />
                        <div onClick={handleShowPassword} className="btn btn-xs absolute right-12 ">{showPass ?  <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</div>
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
              <button className="btn bg-gradient-to-r py-3 rounded-lg font-semibold hover:opacity-90 transition from-primary to-secondary text-white mt-4">Login</button>
            </fieldset>
            <p className="text-center text-sm mt-4">
               <span> New here? <Link to='/register' className="text-purple-600 font-medium hover:underline">Sign Up Here</Link></span>
             </p>
            </form>
            
    
            <p className="text-center my-3 text-gray-500 text-sm">Or With</p>
    
                {/* google */}
            <div className="flex gap-4">
              <button className="w-full flex items-center justify-center gap-2 border hover:bg-black hover:text-white rounded-lg py-2 font-medium">
                <FcGoogle className="text-xl" /> Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
