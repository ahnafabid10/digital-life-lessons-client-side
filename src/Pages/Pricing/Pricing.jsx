import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Pricing = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const {data: pricing = []} = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async ()=>{
      const res = await axiosSecure.get(`/users?email=${user?.email}`)
      return res.data[0]
    }
  })

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade to Premium ⭐</h1>
          <p className="text-gray-500">
            One-time payment. Lifetime access. No hidden fees.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Free Plan */}
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="text-2xl font-bold">Free Plan</h2>
              <p className="text-3xl font-semibold mt-2">৳0</p>
              <p className="text-sm text-gray-500 mb-4">Forever Free</p>

              <ul className="space-y-3">
                <li>✅ Create Free Lessons</li>
                <li>✅ View Public Free Lessons</li>
                <li>❌ Premium Lessons Access</li>
                <li>❌ Create Premium Lessons</li>
                <li>❌ Ad-Free Experience</li>
                <li>❌ Priority Visibility</li>
                <li>❌ Advanced Analytics</li>
                <li>❌ Featured Listings</li>
              </ul>

              <button className="btn btn-outline mt-6 w-full" disabled>
                Current Plan
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-2xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                Premium Plan <span className="badge badge-warning">⭐</span>
              </h2>

              <p className="text-4xl font-bold mt-2">৳1500</p>
              <p className="text-sm opacity-90 mb-4">
                One-time payment · Lifetime access
              </p>

              <ul className="space-y-3">
                <li>✅ Create Unlimited Lessons</li>
                <li>✅ Access Premium Lessons</li>
                <li>✅ Create Premium Lessons</li>
                <li>✅ Ad-Free Experience</li>
                <li>✅ Priority Listing</li>
                <li>✅ Advanced Analytics</li>
                <li>✅ Featured Lessons</li>
                <li>✅ Community Boost</li>
              </ul>
              

              <Link to={`/dashboard/payment/${pricing._id}`}
              className="btn btn-warning mt-6 w-full text-black font-semibold">
                Upgrade to Premium
              </Link>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Secure payment · Lifetime access · Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default Pricing;
