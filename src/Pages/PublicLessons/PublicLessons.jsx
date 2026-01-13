import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaLock, FaSearch, FaFilter, FaSort, FaBookmark, FaCrown, FaCalendar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router';

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState('')
  const [tone, setTone] = useState('')
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 12;

  const { data: publicLessons = [], isLoading } = useQuery({
    queryKey: ['publicLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons?privacy=Public');
      console.log("publicLesson",res.data)
      return res.data;
    },
  });

  const { data: getUsers = [] } = useQuery({
    queryKey: ['userPlan', user?.email],
    queryFn: async () => {
      const resUsers = await axiosSecure.get(`/users/?email=${user.email}`);
      console.log("get user data", resUsers.data)
      return resUsers.data;
    },
  });

  const filter = publicLessons?.filter(v => {
    const matchCategory = category ? v.category === category : true;
    const matchPrivacy = tone ? v.tone === tone : true;
    const matchSearch = search
      ? v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCategory && matchPrivacy && matchSearch;
  })?.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createAt) - new Date(a.createAt);
    }
    if (sortBy === "saved") {
      return (b.favoritesCount || 0) - (a.favoritesCount || 0);
    }
    return 0;
  });

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = filter.slice(indexOfFirstLesson, indexOfLastLesson);
  const totalPages = Math.ceil(filter.length / lessonsPerPage);

  // Skeleton Loader Component
  const SkeletonCard = ({ index }) => (
    <div 
      className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-primary/10 dark:border-primary/20"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
      }}
    >
      <div className="h-1.5 bg-gradient-to-r from-primary/30 to-secondary/30 animate-pulse"></div>
      <div className="p-6">
        <div className="skeleton h-6 w-3/4 mb-4 bg-base-content/10"></div>
        <div className="flex items-center gap-2 mb-4">
          <div className="skeleton w-8 h-8 rounded-full bg-base-content/10"></div>
          <div className="skeleton h-4 w-24 bg-base-content/10"></div>
        </div>
        <div className="skeleton h-4 w-20 mb-4 bg-base-content/10"></div>
        <div className="space-y-2 mb-4">
          <div className="skeleton h-4 w-full bg-base-content/10"></div>
          <div className="skeleton h-4 w-full bg-base-content/10"></div>
          <div className="skeleton h-4 w-2/3 bg-base-content/10"></div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="skeleton h-6 w-20 rounded-full bg-base-content/10"></div>
          <div className="skeleton h-6 w-20 rounded-full bg-base-content/10"></div>
          <div className="skeleton h-6 w-16 rounded-full bg-base-content/10"></div>
        </div>
        <div className="skeleton h-9 w-full rounded-full bg-base-content/10"></div>
      </div>
    </div>
  );

  return (
    <div className='relative overflow-hidden bg-gradient-to-b from-base-100 via-primary/5 to-base-100 min-h-screen py-12'>
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>

      <div className='relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Public Life Lessons
            </span>
          </h1>
          <p className="text-base text-base-content/70 max-w-2xl mx-auto">
            Explore and learn from the collective wisdom of our community
          </p>
        </div>

        {/* Filters Section */}
        <div className='bg-base-100 dark:bg-base-200/50 backdrop-blur-sm rounded-2xl shadow-lg border border-primary/10 dark:border-primary/20 p-6 mb-8'>
          <div className='flex flex-col lg:flex-row items-center gap-4'>
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                placeholder="Search lessons by title or description..."
                className="input input-bordered w-full pl-11 bg-base-100 dark:bg-base-300 border-primary/20 focus:border-primary transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn btn-outline border-primary/20 hover:bg-primary hover:border-primary gap-2">
                <FaFilter className="w-4 h-4" />
                {category || 'Category'}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 dark:bg-base-200 rounded-box z-10 w-52 p-2 shadow-xl border border-primary/10 mt-2">
                <li><a onClick={() => setCategory("")} className="hover:bg-primary/10">All Categories</a></li>
                <li><a onClick={() => setCategory("Relationships")} className="hover:bg-primary/10">Relationships</a></li>
                <li><a onClick={() => setCategory("Personal Growth")} className="hover:bg-primary/10">Personal Growth</a></li>
                <li><a onClick={() => setCategory("Mistakes Learned")} className="hover:bg-primary/10">Mistakes Learned</a></li>
                <li><a onClick={() => setCategory("Mindset")} className="hover:bg-primary/10">Mindset</a></li>
                <li><a onClick={() => setCategory("Career")} className="hover:bg-primary/10">Career</a></li>
              </ul>
            </div>

            {/* Tone Dropdown */}
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn btn-outline border-primary/20 hover:bg-primary hover:border-primary gap-2">
                <FaFilter className="w-4 h-4" />
                {tone || 'Tone'}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 dark:bg-base-200 rounded-box z-10 w-52 p-2 shadow-xl border border-primary/10 mt-2">
                <li><a onClick={() => setTone("")} className="hover:bg-primary/10">All Tones</a></li>
                <li><a onClick={() => setTone("Motivational")} className="hover:bg-primary/10">Motivational</a></li>
                <li><a onClick={() => setTone("Gratitude")} className="hover:bg-primary/10">Gratitude</a></li>
                <li><a onClick={() => setTone("Realization")} className="hover:bg-primary/10">Realization</a></li>
                <li><a onClick={() => setTone("Sad")} className="hover:bg-primary/10">Sad</a></li>
              </ul>
            </div>

            {/* Sort Dropdown */}
            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className="btn btn-outline border-primary/20 hover:bg-primary hover:border-primary gap-2">
                <FaSort className="w-4 h-4" />
                {sortBy === 'newest' ? 'Newest' : sortBy === 'saved' ? 'Most Saved' : 'Sort By'}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 dark:bg-base-200 rounded-box z-10 w-52 p-2 shadow-xl border border-primary/10 mt-2">
                <li><a onClick={() => setSortBy("")} className="hover:bg-primary/10">Default</a></li>
                <li><a onClick={() => setSortBy("newest")} className="hover:bg-primary/10">Newest First</a></li>
                <li><a onClick={() => setSortBy("saved")} className="hover:bg-primary/10">Most Saved</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {[...Array(12)].map((_, index) => (
              <SkeletonCard key={index} index={index} />
            ))}
          </div>
        )}

        {/* Lessons Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentLessons.map((lesson, index) => {
              const isPremiumLesson = lesson.accessLevel === 'Premium';
              const isPremiumUser = getUsers[0]?.isPremium === true;

              return (
                <div 
                  key={lesson._id}
                  className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-primary/10 dark:border-primary/20"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Premium Overlay */}
                  {isPremiumLesson && !isPremiumUser && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-white rounded-2xl">
                      <FaLock className="text-4xl mb-3 animate-pulse" />
                      <p className="font-bold text-lg mb-2">Premium Lesson</p>
                      <Link to="/pricing" className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-semibold hover:scale-105 transition-transform">
                        Upgrade Now
                      </Link>
                    </div>
                  )}

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Top stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${isPremiumLesson ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-primary to-secondary'}`}></div>

                  <div className="p-6 relative z-10">
                    {/* Title */}
                    <h2 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 mb-3 line-clamp-2">
                      {lesson.title}
                    </h2>

                    {/* User Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={lesson?.photo}
                        alt={lesson?.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-base-content/80 truncate flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          {lesson?.name}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-base-content/60 mb-3 flex items-center gap-1">
                      <FaCalendar className="w-3 h-3" />
                      {lesson?.createAt}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3 mb-4">
                      {lesson.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="badge badge-sm bg-primary/10 dark:bg-primary/20 text-primary border-0 font-semibold px-3 py-2">
                        {lesson.category}
                      </span>
                      <span className="badge badge-sm bg-secondary/10 dark:bg-secondary/20 text-secondary border-0 font-semibold px-3 py-2">
                        {lesson.tone}
                      </span>
                      {isPremiumLesson && (
                        <span className="badge badge-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 font-semibold px-3 py-2 flex items-center gap-1">
                          <FaCrown className="w-3 h-3" />
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link to={`/lessonsDetails/${lesson._id}`}>
                      <button 
                        disabled={isPremiumLesson && !isPremiumUser} 
                        className="btn btn-sm w-full bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        See Details
                      </button>
                    </Link>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && currentLessons.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
              <FaBookmark className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-2">No Lessons Found</h3>
            <p className="text-base-content/60">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="btn btn-sm bg-base-100 dark:bg-base-200 border-primary/20 hover:bg-primary hover:text-white hover:border-primary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`btn btn-sm ${currentPage === pageNum ? 'bg-gradient-to-r from-primary to-secondary text-white border-0' : 'bg-base-100 dark:bg-base-200 border-primary/20 hover:bg-primary/10'}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              className="btn btn-sm bg-base-100 dark:bg-base-200 border-primary/20 hover:bg-primary hover:text-white hover:border-primary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

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

export default PublicLessons;