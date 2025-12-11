// import React from 'react';
// import { Link } from 'react-router';

// const Register = () => {
//     return (
//         <div className='h-[80vh] flex flex-col justify-center items-center '>
// <div className="login p-5">
//   <div >
//     <span className="text-4xl font-bold space-y-3">Join us today!</span>
//     <p className='my-3'>Sing up now to become a member.</p>
//   </div>
//   <form action="#">
//     <input type="text" placeholder="Enter Name" required="" />
//     <input type="email" placeholder="Enter Emaill" required="" />
//     <input type="password" placeholder="Choose A Password" required="" />
//     <input type="password" placeholder="Re-Enter Password" required="" />
//     <input type="button" value="Signup" />
//     <span> Already a member? <Link>Login Here</Link></span>
//   </form>
// </div>

//         </div>
//     );
// };

// export default Register;

import React, { useState } from "react";
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <h2 className="text-center text-5xl font-bold mb-5">Join us today!</h2>
        <p className='mb-6'>Sing up now to become a member.</p>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        
        <label className="text-sm font-semibold">Email</label>
        <div className="mt-1 mb-4 flex items-center gap-2 border rounded-lg px-3 py-3">
          <AiOutlineMail className="text-gray-500 text-xl" />
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full outline-none text-sm"
          />
        </div>

        <label className="text-sm font-semibold">Password</label>
        <div className="mt-1 flex items-center gap-2 border rounded-lg px-3 py-3">
          <RiLockPasswordLine className="text-gray-500 text-xl" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your Password"
            className="w-full outline-none text-sm"
          />
          <div onClick={() => setShowPass(!showPass)} className="cursor-pointer">
            {showPass ? (
              <AiOutlineEyeInvisible className="text-gray-500 text-xl" />
            ) : (
              <AiOutlineEye className="text-gray-500 text-xl" />
            )}
          </div>
        </div>


        <div className="flex justify-between items-center mt-2 mb-4">
        </div>

        <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">Sign Up</button>


        <p className="text-center text-sm mt-4">
            <span> Already a member? <Link to='/login' className="text-purple-600 font-medium hover:underline">Login Here</Link></span>
        </p>

        <p className="text-center my-3 text-gray-500 text-sm">Or With</p>

            {/* google */}
        <div className="flex gap-4">
          <button className="w-full flex items-center justify-center gap-2 border hover:bg-black hover:text-white rounded-lg py-2 font-medium">
            <FcGoogle className="text-xl" /> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
