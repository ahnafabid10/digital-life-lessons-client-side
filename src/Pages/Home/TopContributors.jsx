import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaTrophy, FaMedal, FaStar, FaAward } from 'react-icons/fa';

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [] } = useQuery({
    queryKey: ['contributors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/top-contributors');
      return res.data;
    },
  });

  const getRankIcon = (index) => {
    if (index === 0) return <FaTrophy className="w-4 h-4" />;
    if (index === 1) return <FaMedal className="w-4 h-4" />;
    if (index === 2) return <FaAward className="w-4 h-4" />;
    return <FaStar className="w-3.5 h-3.5" />;
  };

  const getRankBadgeStyle = (index) => {
    if (index === 0) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-400/50';
    if (index === 1) return 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-gray-400/50';
    if (index === 2) return 'bg-gradient-to-br from-amber-600 to-orange-700 shadow-amber-500/50';
    return 'bg-gradient-to-br from-primary to-secondary shadow-primary/30';
  };

  return (
    <div className="relative bg-gradient-to-b from-base-100 via-primary/5 to-base-100 overflow-hidden py-20">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-5 py-2 rounded-full mb-6 border border-primary/20">
            <FaTrophy className="text-primary w-4 h-4" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">This Week</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Top Contributors
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Celebrating the amazing people who share valuable life lessons with our community
          </p>
        </div>

        {/* Contributors Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contributors.map((contributor, index) => (
            <Link
              key={index}
              to={`/profile/${contributor?._id || contributor?.userId}`}
              className="group block"
              style={{
                animation: `fadeInScale 0.6s ease-out ${index * 0.08}s both`
              }}
            >
              {/* Card */}
              <div className="relative bg-base-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl dark:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-primary/10 dark:border-primary/20 cursor-pointer">
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Rank Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${getRankBadgeStyle(index)}`}>
                    {getRankIcon(index)}
                  </div>
                </div>

                {/* Avatar */}
                <div className="mb-5 flex justify-center relative z-10">
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 dark:ring-primary/30 dark:group-hover:ring-primary/50 transition-all duration-300">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={contributor?.photo}
                      alt={contributor?.name}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center relative z-10">
                  <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 mb-2">
                    {contributor?.name}
                  </h3>
                  
                  {/* Contribution Count */}
                  {contributor?.lessonCount && (
                    <p className="text-sm text-base-content/60 font-medium">
                      {contributor.lessonCount} {contributor.lessonCount === 1 ? 'Lesson' : 'Lessons'}
                    </p>
                  )}

                  {/* View Profile Hint */}
                  <p className="text-xs text-primary/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view profile
                  </p>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {contributors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTrophy className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-2">No Contributors Yet</h3>
            <p className="text-base-content/60">Be the first to share your life lessons!</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TopContributors;