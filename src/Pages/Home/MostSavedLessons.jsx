import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBookmark, FaArrowRight, FaHeart } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const MostSavedLessons = () => {

  const axiosSecure = useAxiosSecure()
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['mostSavedLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/most-saved');
      return res.data;
    }
  });

  // Skeleton Loader Component
  const SkeletonCard = ({ index }) => (
    <div 
      className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-primary/10 dark:border-primary/20"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`
      }}
    >
      <div className="h-1.5 bg-gradient-to-r from-primary/30 to-secondary/30 animate-pulse"></div>
      <div className="p-6">
        {/* Title and badge skeleton */}
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="skeleton h-6 w-3/4 bg-base-content/10"></div>
          <div className="skeleton h-8 w-16 rounded-full bg-base-content/10"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="skeleton h-4 w-full bg-base-content/10"></div>
          <div className="skeleton h-4 w-full bg-base-content/10"></div>
          <div className="skeleton h-4 w-2/3 bg-base-content/10"></div>
        </div>
        
        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-4 border-t border-primary/10 dark:border-primary/20">
          <div className="skeleton h-8 w-20 rounded-full bg-base-content/10"></div>
          <div className="skeleton h-9 w-28 rounded-full bg-base-content/10"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-base-100 via-primary/5 to-base-100 py-20">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl"></div>

      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-5 py-2 rounded-full mb-6 border border-primary/20">
            <FaBookmark className="text-primary w-4 h-4" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Community Favorites</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Most Saved Life Lessons
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Life lessons our community saves the most
          </p>
        </div>

        {/* Loading State - Skeleton Cards */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))}
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && lessons.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lessons.map((lesson, index) => (
              <div 
                key={lesson.id} 
                className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-primary/10 dark:border-primary/20 flex flex-col min-h-[280px]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Top stripe */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>

                <div className="p-6 relative z-10 flex flex-col h-full">
                  {/* Title and Save Count */}
                  <div className="flex justify-between items-start mb-3 gap-3">
                    <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 leading-snug flex-1 line-clamp-2">
                      {lesson.title}
                    </h3>
                    
                    {/* Save Count Badge */}
                    <div className="flex items-center gap-1.5 bg-primary/10 dark:bg-primary/20 px-3 py-1.5 rounded-full group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors shrink-0 shadow-sm">
                      <FaBookmark className="text-primary w-3 h-3" />
                      <span className="text-xs font-bold text-primary">{lesson.favoritesCount || lesson.saved || 0}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3 mb-5 flex-grow">
                    {lesson.description}
                  </p>

                  {/* Footer */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-primary/10 dark:border-primary/20 mt-auto">
                    <span className="badge bg-primary/10 dark:bg-primary/20 text-primary border-0 font-semibold px-3 py-2 text-xs w-fit">
                      {lesson.category}
                    </span>
                    
                    <Link to={`/lessonsDetails/${lesson._id}`} className="w-full">
                      <button className="btn btn-sm w-full bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg group/btn">
                        Read More
                        <FaArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && lessons.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full mb-6 animate-pulse">
              <FaBookmark className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-2">
              No Saved Lessons Yet
            </h3>
            <p className="text-base-content/60">
              Be the first to save a lesson! 🌱
            </p>
          </div>
        )}

        {/* View All Button */}
        {!isLoading && lessons.length > 0 && (
          <div className="text-center mt-16">
            <Link to="/publicLessons">
              <button className="btn btn-lg bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-bold px-10 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                Explore All Lessons
                <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        )}
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MostSavedLessons;