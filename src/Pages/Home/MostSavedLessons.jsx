import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBookmark, FaArrowRight } from 'react-icons/fa';
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

  if (isLoading) return (
    <div className="flex justify-center items-center py-20">
      <span className="loading loading-infinity loading-xl text-primary"></span>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white py-20">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-6">
            <FaBookmark className="text-primary w-4 h-4" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Community Favorites</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Most Saved Life Lessons
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Life lessons our community saves the most
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-secondary/10 flex flex-col"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary"></div>

              <div className="card-body p-6 relative z-10 flex flex-col h-full">
                {/* Title and Save Count */}
                <div className="flex justify-between items-start mb-4 gap-3">
                  <h3 className="card-title text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-snug flex-1">
                    {lesson.title}
                  </h3>
                  
                  {/* Save Count */}
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full group-hover:bg-primary/20 transition-colors shrink-0">
                    <FaBookmark className="text-primary w-3.5 h-3.5" />
                    <span className="text-sm font-bold text-primary">{lesson.favoritesCount || lesson.saved || 0}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {lesson.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-primary/10 mt-auto">
                  <span className="badge bg-primary/10 text-primary border-0 font-semibold px-4 py-3">
                    {lesson.category}
                  </span>
                  
                  <Link to={`/lessonsDetails/${lesson._id}`}>
                    <button className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg group/btn">
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

        {/* Empty State */}
        {lessons.length === 0 && (
          <div className="text-center mt-10 py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <FaBookmark className="w-10 h-10 text-primary" />
            </div>
            <p className="text-xl text-gray-600 font-medium">
              No lessons found yet 🌱
            </p>
            <p className="text-gray-500 mt-2">
              Be the first to save a lesson!
            </p>
          </div>
        )}

        {/* View All Button */}
        {lessons.length > 0 && (
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
      `}</style>
    </div>
  );
};

export default MostSavedLessons;