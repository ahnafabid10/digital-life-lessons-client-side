import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../Hooks/useAuth";
import SocialPage from "../Pages/SocialPage/SocialPage";

const Login = () => {
  const {signInUser} = useAuth()
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    // signInUser logic here
    signInUser({email: data.email, password: data.password})
    .then(res=>{
        console.log(res.user)
        navigate(location?.state || '/')
    })
    .catch(error=>{
        console.log(error)
    })
  };

  const handleGuestLogin = (email, password) => {
    // Directly call handleLogin with guest credentials
    handleLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-base-300/50">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaLock className="text-3xl text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/80 text-sm">Sign in to continue your journey</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-base-300 focus:border-primary focus:outline-none transition-colors bg-base-200/50"
                  placeholder="Enter your email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-xs text-error flex items-center gap-1 mt-1">
                    <span>●</span> Email is required
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content/80 flex items-center gap-2">
                  <FaLock className="text-primary" />
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    })}
                    type={showPass ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border-2 border-base-300 focus:border-primary focus:outline-none transition-colors bg-base-200/50 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    onClick={handleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors p-2"
                  >
                    {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-xs text-error flex items-center gap-1">
                    <span>●</span> Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-xs text-error flex items-center gap-1">
                    <span>●</span> Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-xs text-error flex items-center gap-1">
                    <span>●</span> Must include uppercase, special character, 8+ chars
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a className="text-sm text-primary hover:underline font-medium cursor-pointer">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit(handleLogin)}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="text-sm text-base-content/50 font-medium">OR</span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* Guest Login Section */}
            <div className="bg-base-200/50 rounded-lg p-4 space-y-3 border border-base-300/50">
              <h3 className="text-sm font-semibold text-base-content/80 mb-3">Quick Login</h3>
              
              {/* User Login */}
              <button
                onClick={() => handleGuestLogin('user@user.com', '123zxcQWE!@#')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-base-content">Login as User</p>
                    <p className="text-xs text-base-content/60">user@user.com</p>
                  </div>
                </div>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {/* Admin Login */}
              <button
                onClick={() => handleGuestLogin('admin@admin.com', '123zxcQWE!@#')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-lg">👨‍💼</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-base-content">Login as Admin</p>
                    <p className="text-xs text-base-content/60">admin@admin.com</p>
                  </div>
                </div>
                <span className="text-secondary group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-base-300"></div>
              <span className="text-sm text-base-content/50 font-medium">OR</span>
              <div className="flex-1 h-px bg-base-300"></div>
            </div>

            {/* Social Login */}
            {/* <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-lg border-2 border-base-300 hover:border-primary hover:bg-base-200/50 transition-all duration-200 font-medium">
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </button> */}
            <SocialPage></SocialPage>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-sm text-base-content/70">
              New to our platform?{" "}
              <Link
                to="/register"
                state={location.pathname}
                className="text-primary font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-xs text-base-content/50">
          Protected by reCAPTCHA and subject to the Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;