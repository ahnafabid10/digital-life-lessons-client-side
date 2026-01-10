import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';
import { FaTrophy } from 'react-icons/fa';

const TopContributors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [] } = useQuery({
    queryKey: ['contributors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/top-contributors');
      return res.data;
    },
  });

  return (
    <div className="relative bg-gradient-to-br from-primary via-secondary to-primary text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-5"></div>
      </div>

      <div className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/20">
            <FaTrophy className="text-white w-4 h-4" />
            <span className="text-white font-semibold text-sm uppercase tracking-wider">This Week</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Top Contributors
          </h2>
          
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Celebrating the amazing people who share valuable life lessons with our community
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <div 
              key={index} 
              className="group text-center"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                
                {/* Rank Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700' :
                    'bg-gradient-to-br from-primary to-secondary'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className={`rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 ${
                    user ? 'w-40 h-40' : 'w-28 h-28'
                  }`}>
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      src={contributor?.avatar}
                      alt={contributor?.name}
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className={`font-bold text-gray-800 group-hover:text-primary transition-colors ${
                  user ? 'text-2xl' : 'text-lg'
                }`}>
                  {contributor?.name}
                </h3>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TopContributors;