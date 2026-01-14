import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { 
  FaCheck, 
  FaTimes, 
  FaCrown, 
  FaInfinity, 
  FaLock, 
  FaChartLine, 
  FaStar, 
  FaShieldAlt,
  FaBolt,
  FaGem
} from "react-icons/fa";

const Pricing = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: pricing = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data[0];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-primary/5 to-base-100 py-16 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl mb-6 shadow-2xl">
            <FaCrown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Upgrade to Premium
            </span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            One-time payment. Lifetime access. Unlock unlimited potential.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="group relative bg-base-100 rounded-3xl shadow-xl border-2 border-base-300 hover:border-primary/30 transition-all duration-500 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-base-300 to-base-300"></div>

            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-base-200 rounded-2xl flex items-center justify-center">
                    <FaLock className="w-6 h-6 text-base-content/60" />
                  </div>
                  <h2 className="text-3xl font-bold text-base-content">Free Plan</h2>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-5xl font-bold text-base-content">৳0</p>
                  <span className="text-base-content/60 text-lg">/forever</span>
                </div>
                <p className="text-base-content/60">Perfect for getting started</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaCheck className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-base-content/80">Create Free Lessons</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaCheck className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-base-content/80">View Public Free Lessons</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaTimes className="w-3 h-3 text-error" />
                  </div>
                  <span className="text-base-content/40">Premium Lessons Access</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaTimes className="w-3 h-3 text-error" />
                  </div>
                  <span className="text-base-content/40">Create Premium Lessons</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaTimes className="w-3 h-3 text-error" />
                  </div>
                  <span className="text-base-content/40">Ad-Free Experience</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaTimes className="w-3 h-3 text-error" />
                  </div>
                  <span className="text-base-content/40">Priority Visibility</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaTimes className="w-3 h-3 text-error" />
                  </div>
                  <span className="text-base-content/40">Advanced Analytics</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaTimes className="w-3 h-3 text-error" />
                  </div>
                  <span className="text-base-content/40">Featured Listings</span>
                </div>
              </div>

              {/* Button */}
              <button 
                className="btn btn-outline btn-lg w-full rounded-2xl font-semibold"
                disabled
              >
                Current Plan
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl shadow-2xl overflow-hidden">
              {/* Top gradient bar with animation */}
              <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-pulse"></div>

              {/* Popular badge */}
              <div className="absolute top-8 -right-12 bg-warning text-warning-content px-12 py-1.5 rotate-45 text-sm font-bold shadow-lg">
                POPULAR
              </div>

              <div className="p-8 text-white relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                {/* Header */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <FaGem className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">Premium Plan</h2>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-5xl font-bold">৳1500</p>
                    <span className="text-white/80 text-lg">/lifetime</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <FaInfinity className="w-4 h-4" />
                    <span>One-time payment · Lifetime access</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Create Unlimited Lessons</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Access Premium Lessons</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Create Premium Lessons</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Ad-Free Experience</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaBolt className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Priority Listing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaChartLine className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Advanced Analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaStar className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Featured Lessons</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/95 font-medium">Community Boost</span>
                  </div>
                </div>

                {/* Button */}
                <Link
                  to={`/dashboard/payment/${pricing._id}`}
                  className="btn btn-warning btn-lg w-full rounded-2xl text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl relative z-10"
                >
                  <FaCrown className="w-5 h-5" />
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 bg-base-100 dark:bg-base-200/50 rounded-2xl p-4 shadow-lg border border-primary/10">
            <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaShieldAlt className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="font-semibold text-base-content">Secure Payment</p>
              <p className="text-sm text-base-content/60">SSL encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-base-100 dark:bg-base-200/50 rounded-2xl p-4 shadow-lg border border-primary/10">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaInfinity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-base-content">Lifetime Access</p>
              <p className="text-sm text-base-content/60">Pay once, use forever</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-base-100 dark:bg-base-200/50 rounded-2xl p-4 shadow-lg border border-primary/10">
            <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaStar className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="font-semibold text-base-content">Premium Support</p>
              <p className="text-sm text-base-content/60">24/7 assistance</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-base-content/60 text-sm">
          Join thousands of satisfied premium members today
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Pricing;